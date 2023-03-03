import Link from "next/link";
import  styles from '../styles/Home.module.css';
import RecommendedList from "components/recommendedList";


function HomePage({productCategories}){

    return(
      <div className="container">
        <main className="main">
          <div className="titleOne"> Welcome to my SSR Rendering with daynamic paramiter examole </div>
          <section className={styles.ssrSectionWrraper}>
          <span className="extra-Info__Message">This section is Server Side renderin and it will index! </span>
            <h1 className="titleOne"> List Of categories</h1>

            <div className={styles.catrgoriesWrapper}>
              {
                Object.keys(productCategories).map( category =>{
                return(
                    <div  className={styles.category} key={category}>
                      <Link href={`/category/${category}`} legacyBehavior>
                          <a className={styles.categoryLink}>{category}</a>
                      </Link>
                    </div>
                )
                })
              }
            </div>
          </section>
          <section className={styles.ssrSectionWrraper}>
            <span className="extra-Info__Message">This section is client side rendering and used "useSWR" !</span>
            <h2 className="titleOne">recomended product only for you </h2>
            <RecommendedList/>
          </section>

        </main>
      </div>

    )
}
export default HomePage;



export async function getServerSideProps(){

    const fetchUrl = "http://localhost:4000/products";
    const response = await fetch(fetchUrl);
    const inventory= await response.json();

    const groupBy = (array, key) => {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, {}); 
    }
    let inventoryCategories = groupBy(inventory , "category");
    return {
        props: {
          productCategories : inventoryCategories,
        }
    }
}