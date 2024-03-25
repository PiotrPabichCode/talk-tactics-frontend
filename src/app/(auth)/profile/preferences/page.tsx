import { Separator } from '@/components/ui/separator';
import { PreferencesForm } from './preferences-form';

export default function PreferencesPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Preferences</h3>
        <p className='text-sm text-muted-foreground'>
          Update your app preferences. Choose theme, set your preffered language
          and font settings.
        </p>
      </div>
      <Separator />
      <PreferencesForm />
    </div>
  );
}
