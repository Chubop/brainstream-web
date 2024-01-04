
import Recorder from '@/components/audio-upload/recorder';

export default function RecordPage() {

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-16">
      <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-8">
        <div className='w-full'>
          <h1 className="mb-2 text-left text-lg font-semibold">Record</h1>
        </div>
        <Recorder />
      </div>
    </div>
  );
}