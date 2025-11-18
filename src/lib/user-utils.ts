import { ref, get, set } from 'firebase/database';
import { database } from './firebase';

/**
 * Генерує унікальний userId в форматі UEB-00001, UEB-00002 і т.д.
 */
export async function generateUserId(): Promise<string> {
  if (!database) throw new Error('Database not initialized');
  const counterRef = ref(database, 'counters/userIdCounter');
  
  try {
    const snapshot = await get(counterRef);
    let counter = 1;
    
    if (snapshot.exists()) {
      counter = snapshot.val() + 1;
    }
    
    // Оновлюємо лічильник
    await set(counterRef, counter);
    
    // Форматуємо userId: UEB-00001
    const userId = `UEB-${counter.toString().padStart(5, '0')}`;
    
    return userId;
  } catch (error) {
    console.error('Error generating userId:', error);
    // Fallback на timestamp якщо щось пішло не так
    return `UEB-${Date.now()}`;
  }
}

/**
 * Перевіряє чи є користувач адміністратором
 */
export async function isUserAdmin(uid: string): Promise<boolean> {
  try {
    if (!database) return false;
    const adminRef = ref(database, `admins/${uid}`);
    const snapshot = await get(adminRef);
    return snapshot.exists() && snapshot.val() === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}
