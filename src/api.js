import apisauce from 'apisauce';

export const api = apisauce.create({
  baseURL: 'https://api.github.com/',
  headers: {Accept: 'application/vnd.github.v3+json'},
  timeout: 15000,
});

export const getProfile = body => {
  console.log("getProfile");
  return api.get(`users/${body.username}`);
};

export const getFollower = body => {
  return api.get(`users/${body.username}/followers`);
};

export const getContacts = (search) => {

  let listContacts = [
    {id:1,  name: "Mark Doe",    status:"inactive", image:"https://bootdey.com/img/Content/avatar/avatar7.png", department: "Bogota", neighborhood: "Bosa", topic: "Prepagos"},
    {id:2,  name: "Clark Man",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar6.png", department: "Bogota", neighborhood: "Bosa", topic: "Prepagos"} ,
    {id:3,  name: "Jaden Boor",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar5.png", department: "Medellin", neighborhood: "Belen", topic: "Armas"} ,
    {id:4,  name: "Srick Tree",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar4.png", department: "Medellin", neighborhood: "Belen", topic: "Armas"} ,
    {id:5,  name: "Erick Doe",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar3.png", department: "Cordoba", neighborhood: "Belen", topic: "Prepagos"} ,
    {id:6,  name: "Francis Doe", status:"active", image:"https://bootdey.com/img/Content/avatar/avatar2.png", department: "Cordoba", neighborhood: "Bosa", topic: "Armas"} ,
    {id:8,  name: "Matilde Doe", status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png", department: "Medellin", neighborhood: "Bosa", topic: "Prepagos"} ,
    {id:9,  name: "John Doe",    status:"active", image:"https://bootdey.com/img/Content/avatar/avatar4.png", department: "Bogota", neighborhood: "Bosa", topic: "Drogas"} ,
    {id:10, name: "Fermod Doe",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar7.png", department: "Bogota", neighborhood: "Bosa", topic: "Drogas"} ,
    {id:11, name: "Danny Doe",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png", department: "Bogota", neighborhood: "Bosa", topic: "Drogas"},
  ];

  console.log("search: ", search);

  let filtered = listContacts.filter( (contact) => contact.department === search.data.department.selectedItem && 
    contact.neighborhood === search.data.neighborhood.selectedItem &&
    contact.topic === search.data.topic.selectedItem
   );
  console.log("filtered: ", filtered);

  return filtered;
}
