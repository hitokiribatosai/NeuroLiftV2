import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { safeStorage } from './storage';

const BACKUP_VERSION = 1;
const EXPORT_FILENAME = 'neurolift_backup';

interface BackupData {
    version: number;
    timestamp: string;
    platform: string;
    data: Record<string, any>;
}

export const DataManager = {
    /**
     * Collects all app data and exports it as a JSON file
     */
    exportData: async (): Promise<boolean> => {
        try {
            // 1. Collect all data keys
            const keysToExport = [
                'neuroLift_journal',
                'neuroLift_history',
                'neuroLift_templates',
                // Add any other relevant keys here
                'neuroLift_tracker_muscles',
                'neuroLift_tracker_selected_exercises'
            ];

            const exportData: Record<string, any> = {};

            keysToExport.forEach(key => {
                const value = safeStorage.getItem(key);
                if (value) {
                    try {
                        exportData[key] = JSON.parse(value);
                    } catch (e) {
                        exportData[key] = value;
                    }
                }
            });

            // 2. Create backup object
            const backup: BackupData = {
                version: BACKUP_VERSION,
                timestamp: new Date().toISOString(),
                platform: 'web/android/ios',
                data: exportData
            };

            const jsonString = JSON.stringify(backup, null, 2);
            const fileName = `${EXPORT_FILENAME}_${new Date().toISOString().split('T')[0]}.json`;

            // 3. Write file
            try {
                // Try writing to Documents directory first (better for Android export)
                const result = await Filesystem.writeFile({
                    path: fileName,
                    data: jsonString,
                    directory: Directory.Documents,
                    encoding: Encoding.UTF8
                });

                // 4. Share file
                await Share.share({
                    title: 'NeuroLift Backup',
                    text: 'Here is my NeuroLift data backup.',
                    url: result.uri,
                    dialogTitle: 'Export Backup'
                });
            } catch (fsError) {
                // Fallback for Web/PWA: Download as file
                console.warn('Filesystem write failed (likely web), fallback to download:', fsError);
                const blob = new Blob([jsonString], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }

            return true;
        } catch (error) {
            console.error('Export failed:', error);
            return false;
        }
    },

    /**
     * Imports data from a JSON string, validating and restoring it
     */
    importData: async (jsonContent: string): Promise<{ success: boolean; message: string }> => {
        try {
            let backup: BackupData;
            try {
                backup = JSON.parse(jsonContent);
            } catch (e) {
                return { success: false, message: 'Invalid file format. Please upload a valid JSON backup.' };
            }

            // Basic validation
            if (!backup.version || !backup.data) {
                return { success: false, message: 'Invalid backup structure. Missing version or data.' };
            }

            // Restore data
            const entries = Object.entries(backup.data);
            if (entries.length === 0) {
                return { success: false, message: 'Backup file contains no data.' };
            }

            // Clear current relevant data before restoring to avoid conflicts? 
            // Or just overwrite. Overwriting is safer for "Restore" functionality.
            entries.forEach(([key, value]) => {
                if (typeof value === 'object') {
                    safeStorage.setItem(key, JSON.stringify(value));
                } else {
                    safeStorage.setItem(key, String(value));
                }
            });

            return { success: true, message: `Successfully restored ${entries.length} data categories.` };
        } catch (error) {
            console.error('Import failed:', error);
            return { success: false, message: 'An unknown error occurred during import.' };
        }
    }
};
