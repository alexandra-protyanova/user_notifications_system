import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NotificationService {
  async sendPushNotification(message: string, destination: string) {
    try {
      await axios.post(destination, { message });
    } catch (error) {
      console.error('Failed to send push notification', error);
    }
  }
}
