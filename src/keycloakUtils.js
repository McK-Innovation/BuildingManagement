import {RequiredActionAlias} from "keycloak-admin/lib/defs/requiredActionProviderRepresentation";

export async function getAllUsersInGroup(client) {

   let groupID = await getGroup(client)

   console.log(groupID)

   let all = await client.groups.listMembers({id: groupID.id})

   return all;


}

export async function getGroup(client) {
   console.log(client)
   try {

      let users = await client.users.find()

      console.log(users)
      console.log(localStorage.getItem("username"))

      for (let val of users) {
         if (val.hasOwnProperty('username')) {
            console.log(localStorage.getItem("username"))
            if (val.username === localStorage.getItem("username")) {
               console.log(val)
               let group = await client.users.listGroups({id: val.id})
               if (group) {
                  console.log(group)
                  return {id: group[0].id, name: group[0].name}//store this maybe
               }
            }
            else{
               console.log("not found")
            }

         }
      }
   }

   catch(error) {
      console.log(error)
   }
}

export async function deleteMember (client, userID, groupID){

   await client.users.delFromGroup({id: userID, groupId: groupID});
}

export async function addUser (client, groupID, credentials = {username: '', email: '', password: '' }) {

   let user =  await client.users.create({
      username: credentials.username,
      email: credentials.email,
      // enabled required to be true in order to send actions email
      emailVerified: true,
      enabled: true,
   });

   await client.users.resetPassword({
      id: user.id,
      credential: {
         temporary: false,
         type: 'password',
         value: credentials.password,
      },
   });

   await client.users.update(
       {id: user.id},
       {
          firstName: 'william',
          lastName: 'chang',
          requiredActions: [RequiredActionAlias.UPDATE_PASSWORD],
          emailVerified: true,
       },
   );

   //TODO: checks here to make sure all these queries are going through

   await client.users.addToGroup({id: user.id, groupId: groupID});

}
