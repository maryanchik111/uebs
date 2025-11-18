'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { ref, set, get, update } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, database, storage } from '@/lib/firebase';
import { generateUserId } from '@/lib/user-utils';

// Інтерфейси для структур даних
export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'homework';
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  completed: boolean;
  fileUrl?: string;
}

export interface Question {
  id: string;
  question: string;
  createdAt: string;
  userId?: string; // Якщо авторизований користувач
  userEmail?: string; // Для авторизованих
  userName?: string; // Для авторизованих
  isAnonymous: boolean;
  answered: boolean;
  answer?: string;
  answeredAt?: string;
  answeredBy?: string; // Admin userId
}

export interface UserProfile {
  userId: string; // Читабельний ID (UEB-00001)
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: string;
  lastLogin: string;
  notifications: Notification[];
  homework: Homework[];
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  uploadProfilePhoto: (file: File) => Promise<string>;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  markHomeworkAsCompleted: (homeworkId: string) => Promise<void>;
  submitQuestion: (question: string, userId?: string, userEmail?: string, userName?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Чекаємо поки Firebase ініціалізується на клієнті
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Завантажуємо профіль користувача з Realtime Database
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          
          // Забезпечуємо наявність всіх полів для старих користувачів
          const completeUserProfile: UserProfile = {
            ...userData,
            notifications: userData.notifications || [],
            homework: userData.homework || [],
            photoURL: userData.photoURL || '',
            userId: userData.userId || `UEB-${Date.now()}`, // Fallback для старих користувачів
          };
          
          setUserProfile(completeUserProfile);
          
          // Оновлюємо час останнього входу
          await update(userRef, {
            lastLogin: new Date().toISOString(),
          });
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string, displayName: string) => {
    if (!auth) throw new Error('Firebase not initialized');
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Генеруємо унікальний userId
    const userId = await generateUserId();

    // Оновлюємо профіль користувача
    await updateProfile(user, { displayName });

    // Відправляємо email для верифікації
    await sendEmailVerification(user);

    // Зберігаємо дані користувача в Realtime Database
    const userProfile: UserProfile = {
      userId,
      email,
      displayName,
      photoURL: '', // За замовчуванням порожнє фото
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      notifications: [],
      homework: [],
    };

    await set(ref(database!, `users/${user.uid}`), userProfile);
    setUserProfile(userProfile);
  };

  const login = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase not initialized');
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (!auth) throw new Error('Firebase not initialized');
    await signOut(auth);
    setUserProfile(null);
  };

  const resetPassword = async (email: string) => {
    if (!auth) throw new Error('Firebase not initialized');
    await sendPasswordResetEmail(auth, email);
  };

  const sendVerificationEmail = async () => {
    if (!auth?.currentUser) throw new Error('No user logged in');
    await sendEmailVerification(auth.currentUser);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user || !userProfile) throw new Error('No user logged in');

    const userRef = ref(database, `users/${user.uid}`);
    await update(userRef, data);

    // Оновлюємо локальний стан
    if (userProfile) {
      setUserProfile({ ...userProfile, ...data });
    }

    // Якщо оновлюється displayName, оновлюємо також Firebase Auth
    if (data.displayName) {
      await updateProfile(user, { displayName: data.displayName });
    }
  };

  const uploadProfilePhoto = async (file: File): Promise<string> => {
    if (!user) throw new Error('No user logged in');

    // Використовуємо простіший шлях без спеціальних символів
    const timestamp = Date.now();
    const fileName = `${timestamp}.jpg`;
    const photoRef = storageRef(storage, `profile-photos/${user.uid}/${fileName}`);
    
    // Завантажуємо файл
    const snapshot = await uploadBytes(photoRef, file);
    
    // Отримуємо URL
    const photoURL = await getDownloadURL(snapshot.ref);

    // Оновлюємо профіль з новим фото
    await updateUserProfile({ photoURL });

    return photoURL;
  };

  const markNotificationAsRead = async (notificationId: string) => {
    if (!user || !userProfile) throw new Error('No user logged in');

    const updatedNotifications = userProfile.notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    );

    await updateUserProfile({ notifications: updatedNotifications });
  };

  const markHomeworkAsCompleted = async (homeworkId: string) => {
    if (!user || !userProfile) throw new Error('No user logged in');

    const updatedHomework = userProfile.homework.map(hw =>
      hw.id === homeworkId ? { ...hw, completed: true } : hw
    );

    await updateUserProfile({ homework: updatedHomework });
  };

  const submitQuestion = async (
    question: string,
    userId?: string,
    userEmail?: string,
    userName?: string
  ) => {
    const questionId = `q-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const questionData: Question = {
      id: questionId,
      question,
      createdAt: new Date().toISOString(),
      isAnonymous: !userId,
      answered: false,
      ...(userId && { userId }),
      ...(userEmail && { userEmail }),
      ...(userName && { userName }),
    };

    // Зберігаємо питання в загальній базі питань
    const questionRef = ref(database, `questions/${questionId}`);
    await set(questionRef, questionData);
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    register,
    login,
    logout,
    resetPassword,
    sendVerificationEmail,
    updateUserProfile,
    uploadProfilePhoto,
    markNotificationAsRead,
    markHomeworkAsCompleted,
    submitQuestion,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
