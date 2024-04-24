import router from "@/router";
import { useAuth } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const useGuards = () => {
    const auth = useAuth();
    const { isLogin } = storeToRefs(auth);

    watch(isLogin, () => {
        if (!isLogin.value) {
            router.push("/login")
        }
    })
}

export default useGuards;