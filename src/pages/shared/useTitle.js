import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | ActForBD`;
        window.scrollTo(0, 0);
    }, [title]);
};

export default useTitle;
