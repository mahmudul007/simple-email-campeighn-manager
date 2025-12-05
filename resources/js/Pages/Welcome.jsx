import { Head, Link, useForm } from '@inertiajs/react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from '@/Components/InputError';

export default function Welcome({ auth, status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex flex-col lg:flex-row">
                {/* Left side - illustration or background */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-500 to-pink-500 items-center justify-center">
                    <img
                        src="https://laravel.com/assets/img/logotype.min.svg"
                        alt="Laravel"
                        className="w-3/4"
                    />
                </div>

                {/* Right side - login/register card */}
                <div className="flex flex-1 items-center justify-center p-6 bg-gray-50 dark:bg-black">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-md px-6 py-3 text-black ring-1 ring-transparent hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg flex flex-col gap-6">
                            <h2 className="text-2xl font-bold text-center dark:text-white">
                                Welcome Back
                            </h2>

                            {status && (
                                <div className="mb-4 text-sm font-medium text-green-600">
                                    {status}
                                </div>
                            )}

                            {/* Login Form */}
                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) =>
                                            setData('remember', checked)
                                        }
                                    />
                                    <Label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Remember me
                                    </Label>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}

                                    <Button className="ms-4" disabled={processing}>
                                        Log in
                                    </Button>
                                </div>
                            </form>

                            <div className="text-center mt-4">
                                <Link
                                    href={route('register')}
                                    className="text-[#FF2D20] hover:underline dark:text-red-400"
                                >
                                    Don't have an account? Register
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
