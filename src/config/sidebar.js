const pages = config('pages') // Get Pages from config

/*Example group item. April 04, 2019
{
	title: "title",
	icon: "fas fa-icon",
	children: [
    pages.groupPage.pageName, //Single Item in group items
    {//Sub group into group pages
      title: 'title',
      icon: 'fas fa-icon',
      children: [
        pages.groupPage.pageName, //Single Item in group items
      ]
    },
  ]
}
*/

export default [
  //pages.licitations.controlPanel,//Control Panel
 // pages.licitations.licitationMe,//Me licitation
  //pages.licitations.productsIndex,//Product index
  pages.users.userProfile,//Profile
  {//User
    title: 'Users',
    icon: 'fas fa-users',
    children: [
      pages.users.userCreate,//User Create
      pages.users.userIndex,//User Index
      pages.users.userDepartments,//Departments Index
      pages.users.userRoles,//Roles Index
    ]
  },
  pages.users.logout,//Logout
]
