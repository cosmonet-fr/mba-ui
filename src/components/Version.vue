<script setup>
const { data } = defineProps(["data"]);
</script>

<template>
    <div class="matrix" >
        <div class="ascii" >
            <p>


    ####%%#####%###%%+-------========+++++++++===========+=*#%%#%%%%########################%% <br>
    ####%#####%##*%%*-------======++++++++++**++===++++=++++#%@@%%#%#####%####%#############%% <br>
    #############*%#+-------====+++++***********++++=+++++++#%@@@##%#####%##%%#############%%# <br>
    %##%####%%##%*%#+-------===+++********+++*++++===+++++++*%@@@%#%#####%###%%###########%%%% <br>
    ##%##%##%#####**+--------==+++++++++**++++++++=====+++++#%@@@@%%#####%##%%%############%@% <br>
    ##########%#%*#+*+=---::--=+++====++*+++++++++++=======+*%%@@%#%####%%##%%%############%%% <br>
    %@%##%####%%%####+=--------===+++++++++++**************++%%%###%#####%##%%#############%%# <br>
    @@%##%%#%##@%%#**++---------==+***#*****######%%%%@@@@@%#@@%+=#%##%##%###%#############%%# <br>
    %@##%#####%@@%%***=------====+**########%%%%%@@@@@@@@@@%##%*##*######%###%#############%%# <br>
    %%###%######@@%%%#=-=-===+**####%%%%%%%%%%@@@@@@@@@@@@%%####+#+######%###%#############%%# <br>
    @%%%%###%%##%@@@%#====+#%@@@@@@@@@@@@@#**#@@@@@@@@@@@@%%%#+%#*+########################%%# <br>
    @%#%####%#####%@%%+-:+**%@@@@@@@@@@@@@%###%@@@@@@@@@@@%#++=##*+######%###%######*######%%# <br>
    @%#########*%--+%#*=++*##%%@@@@@@@@@@@#***+#%@@%%@@@#**+++=#*==%#%###%###%######*######%## <br>
    @##%%###%#%#%+#-++*=-=*##%%%@@@@@@@@%%==+++**##%%%%%##***+-**==######%%##%######**####%%## <br>
    @%###%%#%##%%=#-+=#+=-=*###%%@@@@@@%**======+*##*#######**-*#*####%##%#########****###%%## <br>
    @##%%###%#%###+-*##*-=--====+**##*=-=---=++==+***+*******+=+**###%###%%##%######**####%%#* <br>
    %##%####%#####+=**##===--==+**#*++===---=+*+**+*#*++++***+=+#####%###%###%##########*#%%#* <br>
    %#######%###%%%===++#=====++**+++++*+=+++#%%%@%****+++++*+==#####%###%###%#############%#* <br>
    %##%####%####%%#=-=+*=====+++==+=+*##+#%*#%%##*+++++*++++-+=#########%############**###%#* <br>
    %%######%###%####*-=+=====+++====+*++=+==*%%#***+++++**+=-==#%%%#%%%############**#####%#* <br>
    %####%##%####%%##%##+++=======---====++++#%%%#####*#***+=-++###%###################*#*#%#* <br>
    %####%##%##%%%%##%####%=======--=-=+++***#%%%%%%%%@@%%#+--+*#%%%#%#######%###############* <br>
    %##%%###%#%#%%%########*==++======*#**#%%%%%##******###*-=*+##%##%####################%%#+ <br>
    %%#%####%###%%%##%######+=++=====*%#++==++*########*###+=**=#%%%#################****##%*+ <br>
    %%#%####%###%%%##%#%%%%##*++++==+**====+*%%%%%%%%%%%###+=**==%%%#####################*#%** <br>
    %%%#####%###%%%####%#%%#%#%+++++++++++*#%%%%%%%%%%%%%#*=##*+*:%##########%###########*#%** <br>
    %%###%######%####%###%#%##%#==+==+++**##%++*###*+*####*###***:-%#%#####################%** <br>
    %%##%###%####%%##%###%%%##%%*==+++=++++==+*#########*##%##++:::#%####################*#%** <br>
    %%%#%%##%##%%%%##%###%%###%%#==++++++++++*#%%%%%%%%#%%%%#*=-=-::%%%####################%** <br>
    %%#%%###%#%#%%%#####%%###%%%##==+====+***#%%%%%%%%%#%%##=-===--:*@@%%###################** <br>
    %%#%%%#%%%##%%%#%%##%%#**%%##====+=-===+*###%%%%%%%%%#======---:%@@@%@%%##########**####** <br>
    %%##%##%%###%%%#%%##%%@*#####*:========++*%%%%%%%%#++++====-----@@@%@@@@@%%#######*#####** <br>
    %%%%###%%####%%#%%##%%@######%::===+==++*#%%%#%%++*+++++======-*@@@@@@@@@@%%@%%%####**##** <br>
    %%%%###%%###%%######%%%%##%%%@::::-#*+=+*##**-++++=============%@@@@@@@@@@@@@@%%%%%%##*#*# <br>
    %%%#%##%%####%###%##%%%%@%%%@@::::::-=#%##+-=+++=+===========++@@@@@@@@@@@@@@@@@%@%@%%%### <br>
    %%#%%%#%%##%#%##%@%%%%%%%%@@@=:::::::=%%@%-=====+=========-=++*@@@@@@@@@@@@@@@@@@@@@@@@%%% <br>
    #%%%%##%%#%#%%@@@@@%@%%%%%@@#:::::::%%%%@@@==================+@@@@@@@@@@@@@@@@@@@@@@@@@@%% <br>
    %%%%%##%%%@@@@@@@@@%%%%%%@@%=:-::::%#%%@@@@@+===============+%@@@@@@@@@@@@@@@@@@@@@@@@@@@@ <br>
    %%%%%%@@@@@@@@@@%%%%%%%%@@@+-:-:::=%%%@@@@@@@*==============*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ <br>
    %%%%%%@@@@@@@@@@%%%%%%@@@@%=:--:::%%%%@@@@@@%%*========+===+@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ <br>



            </p>
        </div>
        
    </div>
    <p>
    </p>
</template>

<style lang="scss" scoped>
.matrix {
    z-index: 9999;
    position: fixed;
    left: 0; top: 0; right: 0; bottom: 0;
    background: black;
    p {
        color: green;
    }
    display: flex;
    justify-content: center;
    align-items: center;

}
.ascii {
    // width: 100vw;
    // height: auto;
    p {
        color: green;
        font-family: "Lucida Console", "Courier New", monospace;
        font-size: 0.4rem;
    }
}
</style>