// import Skeleton from 'react-shimmer-skeleton'

// import {UserCard} from '../Components/UserCard'

// //This mimics a delay from the api
// const [isLoading, setIsLoading] = useState(true)
// useEffect(()=>{
//   setTimeout(()=>{
//     setIsLoading(false)
//   },2000)
// },[])

// //imagine this data is coming from an api
// const user = {
//   name: 'Filipe Pfluck',
//   avatar: 'https://avatars.githubusercontent.com/u/62773200?v=4',
//   description: 'Fullstack developer focused in typescript.'
// }

// //Now let's create an example user:
// const fakeUser = {
//   name: 'Joe Doe',
//   avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
//   description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'
// }

// return(
//   <Skeleton
//     isLoading={isLoading}
//     component={UserCard}
//     exampleProps={{user: fakeUser}}
//   >
//     <UserCard user={user}/>
//   </Skeleton>
// )