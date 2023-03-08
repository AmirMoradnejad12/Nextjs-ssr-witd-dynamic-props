import useSWR from "swr";
import styles from "../styles/RecommendedList.module.css";

export default function RecommendedList() {
  const fetcher = async () => {
    const response = await fetch("http://localhost:4000/products");
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
