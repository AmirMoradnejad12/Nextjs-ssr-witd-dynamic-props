import useSWR from "swr";
import styles from "../styles/RecommendedList.module.css";

export default function RecommendedList() {
  const fetcher = async () => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    return data;
  };

  let { data, error, isLoading } = useSWR("products", fetcher);
  if (error) return "An error accour";

  if (isLoading) return "Loading";
  if (!data) return "List is not valid";

  let recommendedProduct = data.slice(0, 8);

  return (
    <div className={styles.recommendedListWrapper}>
      <h2 className="titleOne">Recomended Product Only For You </h2>
      {recommendedProduct.map((item) => {
        return (
          <div className={styles.product} key={item.id}>
            <div className={styles.productThumbnailContainer}>
              <img
                alt={item.title}
                className={styles.productThumbnail}
                src={item.thumbnail}
              />
            </div>
            <h3 className={styles.productTitle}>{item.title}</h3>
          </div>
        );
      })}
    </div>
  );
}
