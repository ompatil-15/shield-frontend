import { useSelector } from 'react-redux'
import { selectCurrentEmail, selectCurrentEncryptionKey, selectCurrentId, selectCurrentIV, selectCurrentPremium, selectCurrentToken } from "../features/auth/authSlice"

const useAuth = () => {
    const id = useSelector(selectCurrentId);
    const email = useSelector(selectCurrentEmail);
    const encryptionKey = useSelector(selectCurrentEncryptionKey);
    const IV = useSelector(selectCurrentIV);
    const token = useSelector(selectCurrentToken);
    const premium = useSelector(selectCurrentPremium)

    return {id, email, encryptionKey, IV, token, premium};
}
export default useAuth;