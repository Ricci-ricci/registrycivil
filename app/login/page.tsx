import LoginForm from "../../components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Connexion - RegistryCivil",
    description: "Page de connexion à l'application RegistryCivil",
};

export default function LoginPage() {
    return <LoginForm />;
}
