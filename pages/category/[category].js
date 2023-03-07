import  styles from '../../styles/Category.module.css';

function CategoryList({categoryItems ,category}){
    return(
        <div className="main">
             <span className="extra-Info__Message">
                 This is an example of SSR with dynamic paramiters
            </span>
            <h1 className="titleOne">{category} categories</h1>

            <div className={styles.itemsWrapper}>
                {categoryItems.map( item=>{
                    return(
                        <div className={styles.product} key={item.id}>
                            <div className={styles.productImageContainer}> 
                                <img className={styles.productImage} src={item.thumbnail}/> 
                            </div>
                            <h2 className={styles.productTitle}>{item.title}</h2> 
                            <div className={styles.productDescription}> {item.description}</div>
                        </div>
                    )
                })}
            </div>       
        </div>
    )
}

export default CategoryList;

export async function  getServerSideProps(context){
    const {params,req , res , query }= context;
    const {category} = params;
    const fetchUrl= `http://localhost:4000/products?category=${category}`;
    const response = await fetch(fetchUrl);
    const data = await response.json();
    return{
        props:{
            categoryItems:data,
            category:category
        }
    }
}