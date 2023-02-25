function CategoryList({categoryItems}){
    console.log({categoryItems});
    return(
        <>
            {categoryItems.map( item=>{
                return(
                    <div key={item.id}>
                        <h2>{item.title}</h2> <span> {item.id}</span>
                    
                    </div>
                )
            })}
        </>
    )
    
}

export default CategoryList;

export async function  getServerSideProps(context){
    const {params,req , res , query }= context;
    const {category} = params;
    console.log('cat' , category)

    const fetchUrl= `http://localhost:4000/products?category=${category}`;

    
    const response = await fetch(fetchUrl);
    const data = await response.json();
    return{
        props:{
            categoryItems:data
        }
    }
}