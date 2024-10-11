import SignIn from "@/app/(auth)/signin/page";
import { useEffect, useState } from "react";

export default function UserAuth({ children }) {
  const [isLogin, setLogin] = useState(true);

  const check_auth = async () => {
    const response = await fetch("https://lime.farmaguru.id/protected", {
      method: "GET",
      credentials: "include",
    });

    if (response.status == 200) {
      const result = await response.json();
      if (result["result"] == "Authorized") {
        setLogin(true);
        console.log(result["username"]);
        localStorage.setItem("username", result["username"]);
        localStorage.setItem("userlevel", result["userlevel"]);
      } else {
        setLogin(false);
      }
    } else {
      setLogin(false);
    }
  };

  useEffect(() => {
    check_auth();
  }, []);

  if (!isLogin) {
    return <SignIn></SignIn>;
  } else {
    return <div>{children}</div>;
  }
}
