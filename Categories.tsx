import React from "react";


// Talking about the restaurant (reservations, special occasions, events)
const cuisine = {
  "Le café dispose-t-il d'une terrasse extérieure?" : "restaurant",
  "Le café peut-il organiser des repas d'affaires?" : "restaurant",
  "Acceptez-vous les groupes pour des événements privés" : "restaurant",
  "Emma, quel est le meilleur endroit pour s'asseoir au café" : "restaurant",
  "Emma, quel est ton plat préféré à servir" : "restaurant",
  "Est-ce que le café accueille des expositions d'art ou des artistes locaux" : "restaurant",
  "Est-ce que le café de la Rose a un programme de fidélité" : "restaurant",
  "Est-ce que le café de la Rose accueille des événements littéraires" : "restaurant",
  "Est-ce que le café propose des soirées musicales" : "restaurant",
  "Est-ce que le café vend des produits artisanaux locaux" : "restaurant",
  "Est-ce que le Wi-Fi est disponible au café" : "restaurant",
  "Est-ce que le Wi-Fi est disponible pour les clients" : "restaurant",
  "Est-il possible de privatiser le café pour un événement" : "restaurant",
  " Est-il possible de réserver une table" : "restaurant",
  "Le café a-t-il un espace dédié pour lire ou travailler" : "restaurant",
  "Le café a-t-il une bibliothèque ou des livres à disposition" : "restaurant",
  "Le café a-t-il une option de privatisation pour les événements" : "restaurant",
  "Le café a-t-il une option pour un dîner romantique" : "restaurant",
  "Le café a-t-il une terrasse extérieure" : "restaurant",
  "Le café de la Rose a-t-il des journaux ou des magazines à lire" : "restaurant",
  " Le café de la Rose a-t-il des partenariats avec des producteurs locaux" : "restaurant",
  "Le café de la Rose a-t-il été récompensé ou reconnu" : "restaurant",
  "Le café de la Rose propose-t-il des événements pour les amateurs de littérature" : "restaurant",
  "Le café de la Rose vend-il des produits locaux" : "restaurant",
  "Le café dispose-t-il d'espaces privés pour des réunions" : "restaurant",
  "Le café dispose-t-il d'un espace pour les réunions d'affaires" : "restaurant",
  "Le café dispose-t-il d'une connexion Wi-Fi gratuite" : "restaurant",
  "Le café dispose-t-il d'une salle pour des expositions" : "restaurant",
  " Le café dispose-t-il d'une terrasse extérieure" : "restaurant",
  "Le café est-il accessible aux personnes à mobilité réduite" : "restaurant",
  "Le café est-il adapté aux familles avec enfants" : "restaurant",
  "Le café est-il adapté pour lire ou étudier" : "restaurant",
  " Le café est-il ouvert les jours fériés" : "restaurant",
  "Le café offre-t-il des services traiteur" : "restaurant",
  "Le café offre-t-il un service de commande pour des occasions spéciales" : "restaurant",
  "Le café organise-t-il des ateliers culinaires" : "restaurant",
  "Le café organise-t-il des dégustations de vin" : "restaurant",
  "Le café organise-t-il des soirées thématiques" : "restaurant",
  "Le café peut-il accueillir des personnes en fauteuil roulant" : "restaurant",
  " Le café propose-t-il des cadeaux ou des cartes-cadeaux" : "restaurant",
  "Le café propose-t-il des conférences ou des rencontres avec des auteurs" : "restaurant",
  "Le café propose-t-il des livraisons à domicile" : "restaurant",
  " Le café propose-t-il des options bio" : "restaurant",
  "Le café propose-t-il des plats à emporter" : "restaurant",
  " Le café propose-t-il des repas pour les grandes occasions" : "restaurant",
  "Le café propose-t-il des repas rapides" : "restaurant",
  " Le café propose-t-il des spécialités de la région de Provence" : "restaurant",
  " Le café propose-t-il des spécialités locales" : "restaurant",
  "Le café propose-t-il des spécialités végétariennes" : "restaurant",
  " Le café propose-t-il un menu pour les enfants" : "restaurant",
  " Le café utilise-t-il des produits de saison" : "restaurant",
  "Le café vend-il des produits faits maison à emporter" : "restaurant",
  "Le café vend-il ses propres produits" : "restaurant",
  " Le menu change-t-il fréquemment" : "restaurant",
  " Le menu change-t-il selon les saisons" : "restaurant",
  "Le menu du café change-t-il fréquemment" : "restaurant",
  "Le menu inclut-il des plats typiques d'autres régions de France" : "restaurant",
  "Le menu inclut-il des plats végétaliens" : "restaurant",
  "Les animaux de compagnie sont-ils autorisés au café" : "restaurant",
  " Les enfants ont-ils un espace de jeux au café" : "restaurant",
  "Les enfants ont-ils un menu spécial" : "restaurant",
  " Les enfants peuvent-ils participer à des ateliers de pâtisserie" : "restaurant",
  "Les enfants sont-ils bienvenus au café" : "restaurant",
  " Les produits sont-ils frais et locaux" : "restaurant",
  " Les produits utilisés sont-ils locaux" : "restaurant",
  "Les réservations sont-elles nécessaires pour le weekend" : "restaurant",
  " Les réservations sont-elles recommandées pour le dîner" : "restaurant",
  " Offrez-vous des services de traiteur pour des événements" : "restaurant",
  "Organisez-vous des dégustations de vins ou de fromages" : "restaurant",
  "Organisez-vous des événements culturels au café" : "restaurant",
  "Organisez-vous des événements pour les enfants" : "restaurant",
  "Peut-on acheter des produits locaux au café" : "restaurant",
  " Peut-on organiser des ateliers ou des cours au café" : "restaurant",
  " Peut-on organiser des repas d'affaires au café" : "restaurant",
  "Peut-on organiser des événements privés au café" : "restaurant",
  "Peut-on organiser un brunch de groupe au café" : "restaurant",
  "Peut-on organiser un dîner romantique au café" : "restaurant",
  "Peut-on organiser une dégustation de pâtisseries" : "restaurant",
  "Peut-on réserver le café pour des événements" : "restaurant",
  " Peut-on réserver le café pour une soirée privée" : "restaurant",
  "Peut-on réserver une table pour une date spécifique" : "restaurant",
  "Peut-on venir avec des poussettes ou des landaus" : "restaurant",
  "Peut-on écouter de la musique française traditionnelle au café" : "restaurant",
  "Pouvez-vous me parler de l'ambiance du Café de la Rose" : "restaurant",
  "Pouvons-nous acheter les produits de votre café" : "restaurant",
  "Pouvons-nous venir avec des enfants en bas âge" : "restaurant",
  "Proposez-vous des événements culturels en lien avec la gastronomie" : "restaurant",
  "Puis-je amener mon propre gâteau pour une célébration" : "restaurant",
  "Puis-je organiser un petit événement au café" : "restaurant",
  "Puis-je trouver des souvenirs du café à acheter" : "restaurant",
  " Quels sont vos horaires d'ouverture" : "restaurant",
  "Votre café est-il engagé dans le développement durable" : "restaurant",
  "Y a-t-il des soirées poésie ou lectures au café" : "restaurant",
  " Y a-t-il des événements culturels organisés au café" : "restaurant",
  "Y a-t-il une option de plats à emporter" : "restaurant",
  " Y a-t-il une spécialité de Provence que vous recommandez" : "restaurant",
  "Avez-vous des options sans sucre ajouté" : "food",
  "Avez-vous des recommandations pour un déjeuner léger" : "food",
  "Avez-vous des recommandations pour un plat léger" : "food",
  "Avez-vous des spécialités du jour" : "food",
  "Disposez-vous d'options pour les régimes hypocaloriques" : "food",
  "Disposez-vous d'un menu pour enfants" : "food",
  "Emma, as-tu une pâtisserie française favorite" : "food",
  "Emma, pouvez-vous préparer un menu surprise" : "food",
  "Emma, pouvez-vous préparer un plat sans certains ingrédients" : "food",
  "Emma, quel est le meilleur dessert pour un amateur de chocolat" : "food",
  "Emma, quel est le plat que vous recommanderiez pour un premier visiteur" : "food",
  "Emma, quel est votre dessert français préféré" : "food",
  "Emma, quel est votre plat français préféré" : "food",
  "Emma, quel est votre plat provençal préféré" : "food",
  "Emma, quel est votre plat préféré au café" : "food",
  "Emma, quel est votre pâtisserie préférée dans le café" : "food",
  " Emma, quelle est votre recommandation pour un dessert" : "food",
  "Emma, êtes-vous impliquée dans la création des plats du menu" : "food",
  "Est-ce que Emma peut aider à choisir un plat pour un régime spécifique" : "food",
  " Est-ce que Emma peut recommander un plat pour un régime spécifique" : "food",
  "Est-ce que le café a des options pour les intolérants au lactose " : "food",
  "Est-ce que le café a des options pour les régimes spéciaux" : "food",
  " Est-ce que le café de la Rose a un plat du jour" : "food",
  "Est-ce que le café organise des ateliers ou des cours de cuisine" : "food",
  "Est-ce que le café propose des ateliers pour enfants" : "food",
  "Est-ce que le café propose des repas à thème régional" : "food",
  "Le café a-t-il des options de plats chauds et froids" : "food",
  "Le café a-t-il des options pour les cœliaques" : "food",
  "Le café a-t-il des options pour les personnes allergiques aux noix" : "food",
  " Le café a-t-il des options pour les régimes spécifiques" : "food",
  " Le café a-t-il des options végétaliennes pour le petit-déjeuner" : "food",
  "Le café a-t-il des plats inspirés par d'autres cultures" : "food",
  " Le café a-t-il des spécialités de saison" : "food",
  "Le café a-t-il un menu du jour" : "food",
  "Le café a-t-il un plat du jour" : "food",
  " Le café a-t-il une option de menu pour les végétariens" : "food",
  "Le café de la Rose a-t-il des options de petit-déjeuner" : "food",
  "Le café de la Rose a-t-il des options sans gluten" : "food",
  "Le café de la Rose a-t-il des plats sans lactose" : "food",
  "Le café de la Rose a-t-il des recettes traditionnelles françaises" : "food",
  "Le café de la Rose a-t-il un menu saisonnier" : "food",
  "Le café de la Rose a-t-il un plat signature" : "food",
  "Le café de la Rose propose-t-il des formules petit-déjeuner" : "food",
  "Le café de la Rose propose-t-il des plats pour les enfants" : "food",
  "Le café de la Rose propose-t-il des plats typiques de Provence" : "food",
  "Le café de la Rose propose-t-il des viennoiseries" : "food",
  " Le café de la Rose vend-il ses propres créations culinaires" : "food",
  "Le café offre-t-il des alternatives de sucre" : "food",
  " Le café offre-t-il des cours de pâtisserie" : "food",
  "Le café offre-t-il des options pour les intolérants au gluten" : "food",
  " Le café offre-t-il des options véganes" : "food",
  "Le café offre-t-il des plats à partager pour deux personnes" : "food",
  "Le café offre-t-il une expérience gastronomique provençale authentique" : "food",
  "Le café propose-t-il des desserts sans gluten" : "food",
  " Le café propose-t-il des options végétariennes" : "food",
  "Le café propose-t-il des plats sans produits laitiers" : "food",
  " Le café propose-t-il des salades de fruits frais" : "food",
  "Le café propose-t-il des sandwichs ou des paninis" : "food",
  " Le café propose-t-il des spécialités de boulangerie françaises" : "food",
  " Le café sert-il des crêpes" : "food",
  " Le café sert-il des plats biologiques" : "food",
  " Le café sert-il des quiches variées" : "food",
  " Le café utilise-t-il des ingrédients frais et locaux" : "food",
  "Le café utilise-t-il des ingrédients équitables" : "food",
  "Le menu inclut-il des plats sans lactose" : "food",
  " Les desserts du café sont-ils faits maison" : "food",
  "Les produits de pâtisserie sont-ils faits maison" : "food",
  "Les repas sont-ils préparés sur place" : "food",
  "Peut-on acheter des pâtisseries françaises à emporter" : "food",
  " Peut-on acheter les pâtisseries en grande quantité" : "food",
  "Peut-on apporter son gâteau d'anniversaire au café" : "food",
  "Peut-on avoir des plats à partager" : "food",
  "Peut-on emporter des pâtisseries en grande quantité" : "food",
  "Peut-on trouver des options sans sucre au café" : "food",
  "Peut-on trouver des produits sans sel au café" : "food",
  "Pouvons-nous commander des plats pour des occasions spéciales" : "food",
  " Proposez-vous des formules déjeuner" : "food",
  " Puis-je avoir la liste des ingrédients d'un plat" : "food",
  "Puis-je trouver des plats typiques de la Provence au café" : "food",
  "Quelle est la pâtisserie la plus populaire du café" : "food",
  "Quelle est la spécialité de la maison" : "food",
  " Y a-t-il des options de desserts sans sucre" : "food",
  "Y a-t-il des options de repas légers" : "food",
  " Y a-t-il des options de repas pour les sportifs" : "food",
  "Y a-t-il des options halal ou casher au menu" : "food",
  "Y a-t-il des options pour les personnes ayant des restrictions alimentaires" : "food",
  "Y a-t-il des options véganes au menu" : "food",
  "Y a-t-il des options végétariennes au café" : "food",
  " Y a-t-il des plats pour les amateurs de viande" : "food",
  "Y a-t-il des plats sans gluten disponibles" : "food",
  "Y a-t-il des spécialités sucrées pour les personnes diabétiques" : "food",
  "Y a-t-il des spécialités sucrées pour les végétaliens" : "food",
  "Emma, pouvez-vous recommander un vin français?" : "beverages",
  "Avez-vous des spécialités de café froid" : "beverages",
  "Avez-vous une sélection de thés" : "beverages",
  "Emma, proposez-vous des boissons locales" : "beverages",
  "Emma, quel est le meilleur café du menu" : "beverages",
  "Emma, quel est le meilleur thé du menu" : "beverages",
  "Emma, quel est votre vin préféré du menu" : "beverages",
  " Est-ce qu'Emma peut nous recommander un vin" : "beverages",
  "Est-ce que le café dispose d'un choix de vins français" : "beverages",
  "Est-ce que le café propose des formules pour le thé de l'après-midi" : "beverages",
  " Est-ce que le café propose des jus de fruits frais pressés" : "beverages",
  "Est-ce que le café vend ses propres mélanges de café ou de thé" : "beverages",
  " Le café a-t-il des spécialités de café froid" : "beverages",
  "Le café a-t-il une sélection de thés" : "beverages",
  "Le café a-t-il une sélection de vins biologiques" : "beverages",
  "Le café a-t-il une sélection de vins de la région Provence" : "beverages",
  "Le café de la Rose offre-t-il des spécialités de café" : "beverages",
  " Le Café de la Rose propose-t-il des boissons alcoolisées" : "beverages",
  "Le café de la Rose propose-t-il des thés aromatisés" : "beverages",
  "Le café offre-t-il des alternatives au lait traditionnel" : "beverages",
  "Le café offre-t-il des options bio pour les boissons" : "beverages",
  " Le café propose-t-il des alternatives de café pour ceux qui n'aiment pas le café" : "beverages",
  "Le café propose-t-il des boissons artisanales" : "beverages",
  " Le café propose-t-il des boissons artisanales locales" : "beverages",
  "Le café propose-t-il des boissons sans alcool" : "beverages",
  "Le café propose-t-il des boissons spéciales en hiver" : "beverages",
  " Le café propose-t-il des boissons végétaliennes" : "beverages",
  "Le café propose-t-il des jus de fruits frais" : "beverages",
  " Le café propose-t-il des options sans caféine" : "beverages",
  "Le café sert-il des boissons énergisantes" : "beverages",
  "Le café sert-il des boissons énergétiques ou des smoothies" : "beverages",
  "Le café vend-il ses propres mélanges de café" : "beverages",
  "Les boissons sont-elles biologiques" : "beverages",
  " Les boissons sont-elles préparées à la commande" : "beverages",
  "Offrez-vous des boissons spéciales pendant les fêtes" : "beverages",
  " Peut-on apporter son vin au café" : "beverages",
  " Peut-on commander des boissons alcoolisées" : "beverages",
  "Peut-on commander des boissons pour accompagner les pâtisseries" : "beverages",
  " Peut-on commander des boissons sans sucre" : "beverages",
  "Peut-on commander des boissons spéciales" : "beverages",
  " Peut-on commander des boissons à base de plantes" : "beverages",
  "Peut-on commander du café à emporter" : "beverages",
  "Peut-on déguster des vins locaux au café" : "beverages",
  " Pouvons-nous commander des boissons spéciales au café" : "beverages",
  "Proposez-vous des alternatives au lait de vache" : "beverages",
  "Proposez-vous des boissons sans alcool" : "beverages",
  "Y a-t-il des options de café biologique au café" : "beverages",
  " Y a-t-il des options de café décaféiné" : "beverages",
  "Avez-vous des options de paiement sans contact" : "paying",
  "Est-ce que le café de la Rose fait des réductions pour les groupes" : "paying",
  "Faites-vous des réductions pour les étudiants ou les seniors" : "paying",
  "Le café a-t-il des offres pour les anniversaires" : "paying",
  "Le café de la Rose fait-il des réductions pour les anciens clients" : "paying",
  "Peut-on payer en espèces au café" : "paying",
  " Y a-t-il des réductions pour les grandes réservations" : "paying",
  "Y a-t-il des réductions pour les réservations de groupe" : "paying",
  "Emma, pourrais-je avoir une recommandation de livre français" : "social",
  "Emma, pouvez-vous recommander un bon livre français" : "social",
  " Emma, pouvez-vous recommander un livre français" : "social"
}

const Categories = () => {
  return (
    
  );
};

export default Categories;
