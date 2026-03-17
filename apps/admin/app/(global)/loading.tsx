import { PulseLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <PulseLoader color="#9ca3af" />
    </div>
  );
}
