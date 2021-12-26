import { useSelector } from "react-redux";

export default function AuthCheck({ children, fallback }) {
    const user = useSelector(state => state.auth.user);

    return !!Object.keys(user).length ? children : fallback ;
}