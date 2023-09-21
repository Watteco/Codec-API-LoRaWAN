## debug.js

<p>Permet d'observer l'entrée et la sortie pour un payload et un capteur donné. Son execution se fait avec la commande:</p>

    node debug.js <device> <port> <payload> <date>

<p>la liste des devices actuelle est :</p>

|         name         |
|:--------------------:|
|        atm'o         |
|        clos'o        |
|       flash'o        |
|         in'o         |
|       inclin'o       |
|  indoor_temperature  |
|       intens'o       |
|        lev'o         |
|        modbus        |
|       monit'o        |
|        move'o        |
| outdoor_temperature  |
|      pilot_wire      |
|       press'o        |
|     pulse_sens'o     |
|  pulse_sens'o_atex   |
|  remote_temperature  |
| remote_temperature_2 |
|      smartplug       |
|          th          |
|        tics'o        |
|     toran'o_atex     |
|      triphas'o       |
|        vaqa'o        |
|      vaqa'o_lt       |
|     vaqa'o_plus      |
|       ventil'o       |

## rebuild_mains.js

<p>Si le code du codec doit être modifié, il faut rebuild les <code>main.js</code> des capteurs afin qu'ils bénéficient de la mise à jour.<br>
si un capteur doit être ajouté ou enlever, il faut modifier la liste <code>devices</code>.</p>

    node ./rebuild_mains.js

## run_tests.js

<p>Permet de lancer tous les tests. Il faut modifier <code>devices</code> si un capteur et ajouté ou enlevé.</p>