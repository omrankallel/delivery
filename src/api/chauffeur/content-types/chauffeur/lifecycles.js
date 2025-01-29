module.exports = {
  async afterCreate(event) {
    console.log("**********************");
    console.log(event.result);
    console.log("**********************");
    let user = await strapi.plugins['users-permissions'].services.user.add({
      blocked: false,
      confirmed: true,
      username: event.result.username,
      email: event.result.email,
      password: '123456',
      provider: 'local',
      role: await getRoleId('Chauffeur'),
    });
  }
}

async function getRoleId(roleName) {
  const role = await strapi.query('plugin::users-permissions.role').findOne({
    where: { name: roleName },
  });
  return role.id;
}