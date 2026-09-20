import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private encryptionKey = 'your-secure-encryption-key'; // Replace with a strong key

  constructor() {}

  /**
   * Encrypt and save a value to localStorage
   * @param key - The key under which the value will be stored
   * @param value - The value to store (any type)
   */
  setItem(key: string, value: any): void {
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), this.encryptionKey).toString();
    localStorage.setItem(key, encryptedValue);
  }

  /**
   * Retrieve and decrypt a value from localStorage
   * @param key - The key of the value to retrieve
   * @returns - The decrypted value or null if the key doesn't exist
   */
  getItem<T>(key: string): T | null {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) {
      return null;
    }
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, this.encryptionKey);
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedValue) as T;
    } catch (error) {
      console.error('Error decrypting data:', error);
      return null;
    }
  }

  /**
   * Remove a key from localStorage
   * @param key - The key to remove
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear all items from localStorage
   */
  clearAll(): void {
    localStorage.clear();
  }
}
