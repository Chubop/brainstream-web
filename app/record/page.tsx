
import Recorder from '@/components/audio-upload/recorder';

export default function RecordPage() {

  return (
    <div className="mx-auto max-w-2xl px-4 pt-16 w-full">
      <div className="rounded-lg border bg-background p-8 flex justify-center items-center flex-col">
        <div className='w-full'>
          <h1 className="mb-2 text-lg font-semibold text-left">Record</h1>
        </div>
        <Recorder />
      </div>
    </div>
  );
}