import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import logoFull from "../../assets/0638760b416ee7488ca6ef20ea955dc946a587db.png";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulación de validación (en producción, aquí iría la llamada al API)
    setTimeout(() => {
      if (email === "admin@syscom360.com" && password === "admin123") {
        // Login exitoso
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({
          email: email,
          name: "Admin User",
          role: "Administrador"
        }));
        navigate("/");
      } else {
        setError("Credenciales incorrectas. Intenta con admin@syscom360.com / admin123");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4E4E4D] via-[#40A095] to-[#5B5B5A] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkgzNnptMTIgMTJoMTJ2MTJINDh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

      <div className="w-full max-w-md relative">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <img src={logoFull} alt="SYSCOM" className="h-16" />
          </div>
          <p className="text-[#99D6CF] text-lg">Sistema ERP Empresarial</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Iniciar Sesión
            </h2>
            <p className="text-gray-600">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded text-[#40A095] focus:ring-2 focus:ring-[#40A095]"
                />
                <span className="text-sm text-gray-700">Recordarme</span>
              </label>
              <button
                type="button"
                className="text-sm text-[#40A095] hover:text-[#99D6CF] font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg font-semibold hover:from-[#99D6CF] hover:to-[#40A095] focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:ring-offset-2 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Ingresando...</span>
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-2">
              Credenciales de demostración:
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs font-mono text-gray-700">
              <p><strong>Email:</strong> admin@syscom360.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-200 text-sm mt-6">
          © 2024 Syscom360. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}