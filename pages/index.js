import Link from "next/link";
import styles from "../styles/Home.module.css";
import RecommendedList from "components/recommendedList";

function HomePage({ productCategories }) {
  let showGategory = (categories) => {
    if (Object.keys(categories).length == 0) {
      return "The category list is empety! May be you forgot run 'server-json -p 4000 db.json' ?";
    }
    return Object.keys(categories).map((category) => {
      return (
        <div className={styles.category} key={category}>
          <Link href={`/category/${category}`} legacyBehavior>
            <a className={styles.categoryLink}>{category}</a>
          </Link>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <main className="main">
        <div className="titleOne">
          {" "}
          Welcome to my SSR Rendering with daynamic paramiter examole{" "}
        </div>
        <section className={styles.ssrSectionWrraper}>
          <span className="extra-Info__Message">
            This section is Server Side renderin and it will index!{" "}
          </span>
          <h1 className="titleOne"> List Of Categories</h1>

          <div className={styles.catrgoriesWrapper}>
            {showGategory(productCategories)}
          </div>
        </section>
        <section className={styles.ssrSectionWrraper}>
          <span className="extra-Info__Message">
            This section is client side rendering and used "useSWR" !
          </span>
          <h2 className="titleOne">Recomended Product Only For You </h2>
          <RecommendedList />
        </section>
      </main>
    </div>
  );
}
export default HomePage;

export async function getServerSideProps() {
  const url = "http://localhost:4000/products";
  try {
    const response = await fetch(url);
     if (!response.ok)
       throw new Error('Network response was not ok! Are you sure you run "json-server -p 4000 db.json" in new terminal? ')
    const inventory = await response.json();
    const groupBy = (array, key) => {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, {});
    };
    const inventoryCategories = groupBy(inventory, "category");
    return {
      props: {
        productCategories: inventoryCategories,
      },
    };
  } catch (error) {
    console.log("you have an error : ", error);
    return {
      props: {
        productCategories: {},
      },
    };
  }
}
