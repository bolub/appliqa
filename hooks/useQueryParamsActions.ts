import { useRouter } from "next/navigation";

type Params = { name: string; value: string | number };

export const useQueryParamsActions = () => {
  const router = useRouter();

  const appendQueryParam = ({ name, value }: Params) => {
    const search = new URLSearchParams(window.location.search);

    if (!value) {
      search.delete(name);
    } else {
      search.append(name, encodeURIComponent(value));
    }

    router.replace(`${window.location.pathname}?${search.toString()}`);
  };

  const setQueryParam = ({ name, value }: Params) => {
    const search = new URLSearchParams(window.location.search);

    if (!value) {
      search.delete(name);
    } else {
      search.set(name, encodeURIComponent(value));
    }

    const questionMark = search.toString() ? "?" : "";

    router.replace(
      `${window.location.pathname}${questionMark}${search.toString()}`
    );
  };

  const setMultipleQueryParams = (searchParams: Params[]) => {
    const search = new URLSearchParams(window.location.search);

    searchParams?.forEach((param) => {
      const { name, value } = param;

      if (!value) {
        search.delete(name);
      } else {
        search.set(name, encodeURIComponent(value));
      }
    });

    router.replace(`/?${search.toString()}`);
  };

  const removeQueryParam = (name: string) => {
    const search = new URLSearchParams(window.location.search);

    search.delete(name);

    router.replace(`/?${search.toString()}`);
  };

  return {
    setQueryParam,
    removeQueryParam,
    setMultipleQueryParams,
    appendQueryParam,
  };
};
