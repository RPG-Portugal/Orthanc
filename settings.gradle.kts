rootProject.name = "rpg-portugal-platform"
include("rpg-portugal-core")
include("rpg-portugal-configuration")
include("rpg-portugal-orthanc")
include("rpg-portugal-jobs")
include("rpg-portugal-logging")
findProject(":rpg-portugal-logging")?.name = "rpgportugal-logging"