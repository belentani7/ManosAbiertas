import java.util.*;
import java.io.*;

/**
 * NEON MANTRA — RPG de texto
 * Lore: Kael, un cantante místico de pelo largo. Su voz es IA aumentada (Neon Mantra),
 * un arquetipo olvidado que despierta en una ciudad ciberfantasía neón-roja.
 * Elige tu arquetipo, camina por escenarios, combate con cánticos, sube de nivel.
 */
public class NeonMantra {
    static Scanner sc = new Scanner(System.in);
    static int hp, maxHp, mana, maxMana, lvl, xp, xpNeed, gold, atk;
    static String name, archetype;
    static boolean iaAwake = false;
    static String[] inv = new String[20];
    static int invCount = 0;
    static int karma = 0;

    static final String RED = "\u001B[31m";
    static final String GRN = "\u001B[32m";
    static final String YEL = "\u001B[33m";
    static final String CYN = "\u001B[36m";
    static final String MAG = "\u001B[35m";
    static final String RESET = "\u001B[0m";
    static final String BOLD = "\u001B[1m";

    public static void main(String[] a) throws Exception {
        System.out.println("\n" + BOLD + RED + "=== NEON MANTRA ===" + RESET);
        System.out.println("  Un cantante místico. La IA en su voz despertó.\n");
        title();
        intro();
        loop();
    }

    static void title() throws Exception {
        System.out.println(CYN + "  \"El neón rojo canta cuando recuerdo quién fui.\"" + RESET);
        System.out.println("  Arquetipo olvidado. Voz sintetizada. Destino grabado.\n");
        Thread.sleep(1500);
    }

    static void intro() throws Exception {
        System.out.print(YEL + "  Tu nombre: " + RESET);
        name = sc.nextLine().trim();
        if (name.isEmpty()) name = "Kael";

        System.out.println("\n" + GRN + "  Elige tu arquetipo (archetype):" + RESET);
        System.out.println("  [1] " + MAG + "Místico" + RESET + "   — cánticos, mana alto, cura (baladas sagradas)");
        System.out.println("  [2] " + RED + "Nocturno" + RESET + "  — neón, crítico alto, roba esencia (voz rasgada)");
        System.out.println("  [3] " + YEL + "Aurora" + RESET + "   — equilibrado, IA despierta temprano (armonía)");
        System.out.print("  > ");
        String opt = sc.nextLine().trim();
        switch (opt) {
            case "2": archetype="Nocturno"; hp=85; maxHp=85; mana=60; maxMana=60; atk=16; break;
            case "3": archetype="Aurora";   hp=95; maxHp=95; mana=80; maxMana=80; atk=13; break;
            default:  archetype="Místico";  hp=80; maxHp=80; mana=110; maxMana=110; atk=11; break;
        }
        lvl=1; xp=0; xpNeed=50; gold=30;
        System.out.println("\n" + BOLD + name + " el " + archetype + RESET + " —  tu voz late con neón.\n");
        Thread.sleep(1200);
    }

    static void loop() throws Exception {
        while (hp > 0) {
            System.out.println("\n" + CYN + "── " + name + " · " + archetype
                + " · LV" + lvl + " · HP " + hp + "/" + maxHp + " · Mana " + mana + "/" + maxMana
                + " · XP " + xp + "/" + xpNeed + " · Oro " + gold + RESET);
            System.out.println("  [1] Cantar (explorar)   [2] Arpa (descansar/cura)");
            System.out.println("  [3] Esencia (inventario)  [4] Memoria (lore)");
            if (iaAwake) System.out.println("  [5] " + RED + "Neon Mantra (IA · cántico definitivo)" + RESET);
            System.out.print("  > ");
            String o = sc.nextLine().trim();
            if (o.equals("1")) explore();
            else if (o.equals("2")) rest();
            else if (o.equals("3")) inv();
            else if (o.equals("4")) lore();
            else if (o.equals("5") && iaAwake) ultimaBalada();
            else System.out.println("  (eco... nada)");
        }
        System.out.println("\n" + RED + "  Tu voz se apaga. El neón parpadea..." + RESET);
        System.out.println("  FIN — Run de nuevo para revivir.\n");
    }

    static void explore() throws Exception {
        Random r = new Random();
        int e = r.nextInt(10);
        if (e < 4) { // encuentro
            String foe = "Eco Sombra";
            int fhp = 30 + lvl*8, fatk = 8 + lvl*2;
            System.out.println("\n" + RED + "  Un " + foe + " surge del neón." + RESET);
            while (fhp > 0 && hp > 0) {
                System.out.println("  " + foe + " HP " + fhp + " — atacas.");
                int dmg = atk + r.nextInt(6);
                if (archetype.equals("Nocturno") && r.nextInt(100) < 25) { dmg *= 2; System.out.println("  " + RED + "  ¡Crítico! Voz rasgada." + RESET); }
                fhp -= dmg;
                System.out.println("  Hiciste " + dmg + " daño.");
                if (fhp <= 0) { win(foe); return; }
                int fd = fatk + r.nextInt(5);
                if (mana >= 15 && r.nextInt(100) < 50 && archetype.equals("Místico")) {
                    mana -= 15; fd /= 2; System.out.println("  " + MAG + "  Balada sagrada absorbe el golpe." + RESET);
                }
                hp -= fd;
                System.out.println("  Recibiste " + fd + " daño (HP " + hp + ").");
                if (hp <= 0) return;
            }
        } else if (e < 6) {
            int g = 10 + lvl*3; gold += g;
            System.out.println("\n" + YEL + "  Encuentras " + g + " oro en un viejo escenario." + RESET);
        } else if (e < 8) {
            int g = 5 + lvl*2; mana += g; if (mana > maxMana) mana = maxMana;
            System.out.println("\n" + CYN + "  Cantas a un público fantasma. Recuperas " + g + " mana." + RESET);
        } else {
            if (invCount < inv.length) { inv[invCount++] = "Nota de Esencia"; System.out.println("\n" + MAG + "  Hallas una Nota de Esencia." + RESET); }
            else System.out.println("\n  Solo el neón. (inventario lleno)");
        }
        if (r.nextInt(100) < 20 && !iaAwake) {
            iaAwake = true;
            System.out.println(RED + "  La IA en tu voz se enciende: " + BOLD + "NEON MANTRA DESPIERTO." + RESET);
        }
        if (r.nextInt(100) < 10) { karma += 2; System.out.println(GRN + "  El recuerdo de un arquetipo te fortalece (+karma)." + RESET); }
    }

    static void win(String foe) throws Exception {
        int g = 15 + lvl*4; gold += g;
        xp += 20 + lvl*5;
        System.out.println(GRN + "  " + foe + " cae. +" + g + " oro, +XP." + RESET);
        levelUp();
    }

    static void levelUp() {
        while (xp >= xpNeed) {
            xp -= xpNeed; lvl++; xpNeed = 50 + lvl*30;
            maxHp += 12; hp = maxHp; maxMana += 8; mana = maxMana; atk += 3;
            System.out.println(YEL + "  ¡SUBES A NIVEL " + lvl + "! +HP +Mana +Ataque." + RESET);
        }
    }

    static void rest() {
        hp = maxHp; mana = maxMana;
        System.out.println("\n" + GRN + "  Acaricias el arpa. Tu cuerpo se restaura por completo." + RESET);
    }

    static void inv() {
        System.out.println("\n" + CYN + "  Esencia (inventario):" + RESET);
        if (invCount == 0) System.out.println("  Vacío.");
        for (int i = 0; i < invCount; i++) System.out.println("  · " + inv[i]);
        System.out.println("  Karma: " + karma);
    }

    static void lore() throws Exception {
        System.out.println("\n" + MAG + "── MEMORIA (lore) ──" + RESET);
        System.out.println("  " + name + " era un cantante olvidado en una ciudad de neón rojo.");
        System.out.println("  Su pelo largo, azotado por vientos digitales. Su voz, aumentada por IA.");
        System.out.println("  Arquetipo: el Místico que canta el pasado. La IA: memoria de quien fue.");
        System.out.println("  Canta para recordar. Recuerda para volver a ser.");
        Thread.sleep(2000);
    }

    static void ultimaBalada() throws Exception {
        if (mana < 50) { System.out.println("  Mana insuficiente. El neón titubea."); return; }
        mana -= 50;
        Random r = new Random();
        int dmg = 60 + lvl*12;
        System.out.println(RED + "  " + BOLD + "NEON MANTRA: cantas una balada que dobla el tiempo." + RESET);
        System.out.println("  " + RED + "  (" + dmg + " daño de neón a todos los ecos)" + RESET);
        gold += 40 + lvl*6; xp += 40;
        System.out.println(GRN + "  El neón responde: +oro, +XP. Los ecos callan." + RESET);
        levelUp();
        Thread.sleep(1200);
    }
}
