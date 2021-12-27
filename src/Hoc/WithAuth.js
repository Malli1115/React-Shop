import { useAuth } from "../CustomHooks";

const WithAuth = (props) => useAuth(props) && props.children;

export default WithAuth;
