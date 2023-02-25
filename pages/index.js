import Link from "next/link";
import useSWR from 'swr';
import  styles from '../styles/Home.module.css'




function HomePage({productCategories}){

    return(
        <main className={styles.main}>
          <div className={styles.titleOne}> Welcome to my SSR Rendering with daynamic paramiter examole </div>
          <section className={styles.ssrSectionWrraper}>
          <span className={styles.sectionDescription}>This section is Server Side renderin and it will index! </span>

          
            <h1 className={styles.titleOne}> List Of categories</h1>

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
          <section>|
            <p>this section is client side rendering !</p>
            <h2>recomended product only for you </h2>
            <RecommendedList/>
          </section>

      </main>
    )
}
export default HomePage;


function RecommendedList() {

  const fetcher = async()=>{
    const response = await fetch("http://localhost:4000/products");
  
    const data = await response.json();
    return data;
  }
  
  let {data , error , isLoading } =  useSWR('index3' , fetcher)
  if(error) return "An error accour"; 
  console.log("data" , data)

  if(isLoading) return "Loading";
  if(!data) return "List is not valid";

  let recommendedProduct=data.slice(0, 8)

  return(
      <>
        {
          recommendedProduct.map( item => {
            return(
              <div key={item.id }>
                <p>{item.title}</p>
              </div>
            )
          })
        }
      </>
  )
    
}


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