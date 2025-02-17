module.exports = {
  async afterCreate(event) {
    console.log("**********************");
    console.log(event.result);
    console.log("**********************");

    // Récupérer l'année et le mois au format YYMM
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // YY
    const month = String(now.getMonth() + 1).padStart(2, "0"); // MM
    // Générer l'ID formaté avec suffisamment de zéros
    const idStr = String(event.result.id);
    const minLength = 8 - (year.length + month.length); // Nombre de caractères pour l'ID
    const formattedId = idStr.padStart(minLength, "0"); // Ajouter des zéros devant

    // Construire le bordereau au format YYMM000ID
    const bordereau = `${year}${month}${formattedId}`;
    await strapi.entityService.update(
      "api::colis-destinateur.colis-destinateur",
      event.result.id,
      {
        data: {
          bordereau,
        },
      }
    );
  },
};
