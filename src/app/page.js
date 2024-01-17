import GetDataButton from '@/components/GetDataButton';
import GoogleAuthButton from '@/components/GoogleAuthButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GoogleAuthButton />
      <GetDataButton />
    </main>
  );
}
