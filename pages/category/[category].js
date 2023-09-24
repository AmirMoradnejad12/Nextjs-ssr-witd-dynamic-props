import styles from "styles/Category.module.css";

function CategoryList({ categoryItems, category }) {
  let showProducts = (products) => {
    if (products.length == 0) return "Product List Is Empty !!";
    return products.map((item) => {
      return (
        <div className={styles.product} key={item.id}>
          <div className={styles.productImageContainer}>
            <img className={styles.productImage} src={item.thumbnail} />
          </div>
          <h2 className={styles.productTitle}>{item.title}</h2>
          <div className={styles.productDescription}>{item.description}</div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <div className="main">
        <span className="extra-Info__Message">
          This is an example of SSR with dynamic paramiters
        </span>
        <h1 className="titleOne">{category} categories</h1>

        <div className={styles.itemsWrapper}>{showProducts(categoryItems)}</div>
      </div>
    </div>
  );
}

export default CategoryList;

export async function getServerSideProps(context) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { params } = context;
  const { category } = params;

  const url = `${BASE_URL}/products?category=${category}`;
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(
        'Network response was not ok! Are you sure you run "json-server -p 4000 db.json" in new terminal? '
      );
    const data = await response.json();
    return {
      props: {
        categoryItems: data,
        category: category,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        categoryItems: [],
        category: [],
      },
    };
  }
}
