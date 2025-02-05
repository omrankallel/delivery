module.exports = {
  async afterCreate(event) {
    console.log("**********************");
    console.log(event.result);
    console.log("**********************");
    let user = await strapi.plugins['users-permissions'].services.user.add({
      blocked: false,
      confirmed: false,
      username: event.result.username,
      email: event.result.email,
      password: '123456',
      provider: 'local',
      role: await getRoleId('Chauffeur'),
    });
  },
  async afterDelete(event) {
    const email = event.result.email;

    // Vérifier si l'utilisateur existe avant de le supprimer
    let existingUser = await strapi.entityService.findMany("plugin::users-permissions.user", {
      filters: { email:email },
    });

    if (existingUser.length > 0) {
      const userId = existingUser[0].id;

      await strapi.entityService.delete("plugin::users-permissions.user", userId);
      console.log(`Utilisateur supprimé : ${email}`);
    }
  },
}

async function getRoleId(roleName) {
  const role = await strapi.query('plugin::users-permissions.role').findOne({
    where: { name: roleName },
  });
  return role.id;
}