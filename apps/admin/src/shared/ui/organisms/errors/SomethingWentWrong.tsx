import { TriangleAlert } from 'lucide-react';

export const SomethingWentWrong = () => {
  return (
    <div className="text-red flex h-full w-full items-center justify-center gap-x-1.5">
      <TriangleAlert />
      <span className="text-lg capitalize">Something went wrong</span>
    </div>
  );
};
