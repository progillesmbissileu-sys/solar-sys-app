export function ResourceNotFound({ message = 'Resource Not Found' }: { message?: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="rounded-lg border border-gray-300 p-5 dark:border-gray-700">
        <span className="text-gray-600 dark:text-gray-600">{message}</span>
      </div>
    </div>
  );
}
