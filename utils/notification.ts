import { LocalNotifications } from '@capacitor/local-notifications';

export const requestNotificationPermissions = async () => {
    try {
        const status = await LocalNotifications.checkPermissions();
        if (status.display !== 'granted') {
            const result = await LocalNotifications.requestPermissions();
            return result.display === 'granted';
        }
        return true;
    } catch (e) {
        console.warn("Notification permissions check failed (likely helper web)", e);
        return false;
    }
};

export const scheduleRestNotification = async (seconds: number) => {
    try {
        const hasPerm = await requestNotificationPermissions();
        if (!hasPerm) return;

        // Cancel any existing rest notifications
        await LocalNotifications.cancel({ notifications: [{ id: 1 }] });

        const triggerDate = new Date(Date.now() + seconds * 1000);

        await LocalNotifications.schedule({
            notifications: [
                {
                    title: 'Rest Finished',
                    body: 'Time to get back to work! 💪',
                    id: 1,
                    schedule: { at: triggerDate },
                    sound: 'res/raw/notification_sound.wav', // We might need to configure this, or rely on default
                    actionTypeId: '',
                    extra: null,
                    smallIcon: 'ic_stat_icon_config_sample' // Default resource name often used
                }
            ]
        });
    } catch (e) {
        console.error("Failed to schedule notification", e);
    }
};

export const cancelRestNotification = async () => {
    try {
        await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
    } catch (e) {
        console.error("Failed to cancel notification", e);
    }
};
