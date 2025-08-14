export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-primary-100 border-t-primary-600 animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-r-secondary-500 animate-spin animate-reverse"></div>
      </div>
    </div>
  );
}
