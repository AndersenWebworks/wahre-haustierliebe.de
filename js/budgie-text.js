/**
 * Budgie Brain — Text-Generierungs-System
 *
 * Erzeugt atmosphärische, literarische Texte auf Deutsch.
 * Drei Ebenen:
 *   1. VERHALTEN (3. Person, beobachtbar)
 *   2. MONOLOG (1. Person, Wellensittich-Perspektive)
 *   3. ERKLÄRUNG (wissenschaftlich, lehrreich)
 *
 * Texte werden kompositionell erzeugt:
 *   Basis (dominante Stimmung) + Modifikatoren (sekundäre Zustände)
 */

const BudgieText = (function() {
  'use strict';

  const PICK = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // =========================================================================
  // VERHALTENSBESCHREIBUNGEN (3. Person, literarisch)
  // =========================================================================

  const BEHAVIOR = {

    // --- Basis-Stimmungen ---

    content: [
      '{name} sitzt entspannt auf der Stange, das Gefieder liegt glatt an. Ab und zu ein leiser, melodischer Triller — fast wie ein Lied, das nur für sich selbst bestimmt ist.',
      '{name} klettert geschickt von Stange zu Stange, probiert verschiedene Positionen aus. Die Bewegungen sind fließend, fast spielerisch. Ein zufriedener Vogel.',
      '{name} putzt sich ausgiebig — Feder für Feder wird durch den Schnabel gezogen. Diese Art der Gefiederpflege zeigt: Der Vogel fühlt sich sicher genug, um sich verwundbar zu machen.',
      '{name} wippt rhythmisch mit dem Kopf, die Pupillen pinnen (weiten und verengen sich schnell). Volle Aufmerksamkeit, aber ohne Angst — pure Lebensfreude.',
      '{name} hat den Kopf leicht schräg gelegt und betrachtet etwas am Boden. Ein leises, fragendes Piepen. Neugier in Reinform.',
      '{name} knabbert zufrieden an einem Körnchen, dreht es im Schnabel, lässt die Spelze fallen. Ein kleines Ritual — fressen ohne Hast, mit der Ruhe eines Vogels, der weiß, dass morgen auch noch Futter da ist.',
      '{name} streckt erst den rechten Flügel, dann das rechte Bein — synchron, bis in die Zehenspitzen. Eine Geste totaler Entspannung. Nur sichere Vögel zeigen das.',
      '{name} hat die Augen halb geschlossen und schaukelt leicht auf der Stange. Nicht müde — zufrieden. Manchmal sieht Glück bei einem Wellensittich aus wie Faulheit.',
      '{name} reibt den Schnabel an der Stange — links, rechts, links. Das leise Schaben klingt wie ein Schlaflied, das der Vogel sich selbst vorsingt. Schnabelschleifen ist ein Wohlfühlritual.',
      '{name} hängt sich kopfüber an das Gitter, baumelt einen Moment, schwingt sich wieder hoch. Wiederholt das. Und nochmal. Spielen, weil Spielen Spaß macht — nicht weil sonst nichts zu tun wäre.',
      '{name} sitzt auf dem Rand des Wassernapfs und taucht den Schnabel ein, zieht ihn raus, schüttelt den Kopf. Wasserspritzer fliegen. Dann nochmal. Ein Minibad mit maximaler Freude.',
      '{name} hat einen Gegenstand entdeckt — eine Spelze, ein Stück Rinde — und schiebt ihn mit dem Schnabel über die Stange. Hin und her. Ein Spiel, das nur er versteht.',
    ],

    neutral: [
      '{name} sitzt auf der mittleren Stange und beobachtet den Raum. Gelegentlich ein kurzer Kontaktruf — routinemäßig, ohne Dringlichkeit.',
      '{name} pickt an einem Körnchen, lässt es fallen, pickt ein anderes. Normales Fressverhalten, nichts Auffälliges.',
      '{name} wechselt die Position, von links nach rechts auf der Stange. Ein kurzes Flügelstrecken. Alltag.',
      '{name} sitzt ruhig, die Augen offen und wachsam. Nicht angespannt, nicht entspannt — irgendwo dazwischen. Aufmerksames Warten.',
      '{name} kratzt sich kurz am Kopf mit dem Fuß, schüttelt das Gefieder, setzt sich wieder hin. Routinebewegungen. Der Tag hat weder Höhen noch Tiefen.',
      '{name} folgt mit den Augen einer Bewegung im Raum. Kurzes Kopfdrehen, dann Desinteresse. Nicht alles ist aufregend, und das ist in Ordnung.',
      '{name} döst auf der Stange, ein Auge offen, eins geschlossen. Unihemisphärischer Schlaf — eine Gehirnhälfte ruht, die andere wacht. Beutetier-Grundeinstellung.',
      '{name} lässt einen einzelnen, kurzen Ruf hören. Wartet. Nichts passiert. Weitermachen. Der Raum ist bekannt, die Geräusche sind bekannt. Routine ist nicht Zufriedenheit, aber auch nicht Unglück.',
      '{name} inspiziert den Futternapf, ohne zu fressen. Schaut hinein, schaut weg. Nicht hungrig — nur checken, ob alles noch da ist. Vorratsinstinkt.',
    ],

    restless: [
      '{name} bewegt sich häufiger als sonst — von Stange zu Stange, ohne erkennbares Ziel. Die Bewegungen wirken unruhig, fast getrieben.',
      '{name} dreht den Kopf in schnellen, ruckartigen Bewegungen. Die Federn sind leicht angehoben — nicht aufgeplustert, aber auch nicht glatt. Ein Vogel, der nicht zur Ruhe kommt.',
      '{name} sitzt auf einer Stange, steht wieder auf, fliegt zur nächsten, bleibt nicht lange. Dazwischen kurze, abgehackte Rufe — kein Singen, kein Kontaktruf, eher ein nervöses Grundrauschen.',
      '{name} kratzt sich häufig am Kopf und am Hals. Nicht ungewöhnlich per se, aber die Häufigkeit fällt auf. Ein Zeichen innerer Unruhe.',
      '{name} nagt am Gitter. Nicht wie ein Vogel, der raus will, sondern wie einer, der nicht weiß, wohin mit sich. Die Schnabelbewegungen sind mechanisch, fast trance-artig.',
      '{name} flattert kurz auf, setzt sich wieder, flattert wieder. Die Flügel wollen fliegen, aber es gibt nirgendwo hin. Aufgestaute Energie ohne Ventil.',
    ],

    stressed: [
      '{name} sitzt aufgeplustert in einer Ecke, den Kopf leicht eingezogen. Das Gefieder steht ab — nicht fluffig-gemütlich, sondern als Schutzreaktion. Die Augen wandern, der Körper ist starr.',
      '{name} gibt monotone, kurze Laute von sich. Immer derselbe Ton, in unregelmäßigen Abständen. Es klingt wie ein Ruf, der nirgendwo ankommt.',
      '{name} hat sich auf den höchsten Punkt im Käfig zurückgezogen und rührt sich kaum. Die Starre ist kein Schlaf — die Augen sind offen, die Muskeln angespannt. Fluchtbereitschaft.',
      '{name} klettert am Gitter entlang, immer dieselbe Route, hin und zurück. Stereotypie — eine Wiederholungshandlung, die zeigt, dass der Vogel keine andere Möglichkeit sieht, mit seinem Zustand umzugehen.',
      '{name} zuckt zusammen. Etwas hat sich bewegt — eine Gardine, ein Schatten. Der Körper fährt hoch, die Flügel angelegt, bereit zur Flucht. Dann sackt er wieder zusammen. Falschalarm. Aber der Körper kommt nicht runter.',
      '{name} pickt an einer Stelle am Brustgefieder. Systematisch. Immer dieselbe Stelle. Ein Federkiel nach dem anderen. Die Bewegung hat etwas Mechanisches — kein Putzen, sondern eine Art, den Druck von innen nach außen zu verlagern.',
    ],

    crisis: [
      '{name} sitzt am Käfigboden. Das ist ein Alarmsignal — gesunde Wellensittiche meiden den Boden. Die Augen sind halb geschlossen, das Gefieder aufgeplustert. Kaum Reaktion auf Geräusche.',
      '{name} hat aufgehört zu fressen. Der Napf ist voll, der Vogel ignoriert ihn. Die Federn sind stumpf, an mehreren Stellen fehlen sie ganz. So sieht ein Vogel aus, der aufgibt.',
      '{name} reagiert auf nichts mehr. Kein Kopfdrehen bei Geräuschen, kein Fluchtreflex bei Annäherung. Die Augen sind trüb. Das ist keine Entspannung — das ist Erschöpfung.',
    ],

    sleeping: [
      '{name} hat den Kopf ins Rückengefieder gesteckt und steht auf einem Bein. Leises, regelmäßiges Atmen. Tiefschlaf — der Vogel fühlt sich sicher genug, um loszulassen.',
      '{name} sitzt zusammengerollt auf der Schlafstange, die Federn leicht aufgeplustert für Wärme. Die Augen sind geschlossen. Stille.',
      '{name} schläft. Ab und zu ein leises Geräusch — Vögel träumen. Die Gehirnaktivität während des Vogelschlafs ähnelt der beim Erlernen neuer Gesänge.',
    ],

    sick: [
      '{name} sitzt aufgeplustert auf der Stange, beide Füße umklammern das Holz. Die Bewegungen sind langsam, bedächtig — als würde jede Anstrengung Kraft kosten. Der Vogel versucht, normal zu wirken, aber etwas stimmt nicht.',
      '{name} frisst auffallend wenig. Der Kot hat sich verändert — wässriger als sonst. Das Gefieder wirkt stumpf. Wellensittiche sind Meister darin, Krankheit zu verbergen. Wenn du es siehst, ist es schon fortgeschritten.',
      '{name} atmet schwerer als normal. Bei genauem Hinsehen: leichtes Schwanzwippen im Rhythmus der Atmung. Das ist kein Schwanzwedeln — das sind die Atemmuskeln, die arbeiten.',
    ],

    dying: [
      '{name} liegt am Käfigboden. Das Gefieder ist aufgeplustert und stumpf, die Augen kaum noch offen. Jede Bewegung scheint eine Überwindung. Der Vogel ist schwer krank und braucht sofort einen Tierarzt.',
      '{name} reagiert nicht mehr. Kein Fluchtreflex, kein Laut, kein Zeichen von Aufmerksamkeit. Die Atmung ist flach und schnell. Ohne sofortige Hilfe wird es nicht besser.',
    ],

    dead: [
      '{name} ist gestorben. Stille im Käfig, wo vorher Leben war.',
    ],
  };


  // =========================================================================
  // MODIFIKATOREN (werden an Basis-Beschreibung angehängt)
  // =========================================================================

  const BEHAVIOR_MODS = {
    hungry: [
      'Der Futternapf wurde mehrfach angesteuert, aber {name} frisst kaum — ein paar Körner aufgenommen, die meisten wieder fallen gelassen.',
      'Gelegentlich pickt {name} an der Stange oder am Gitter — Ersatzhandlung, wenn das Futter nicht reicht oder der Appetit fehlt.',
      '{name} schaut zum Futternapf, fliegt aber nicht hin. Der Hunger ist da, aber etwas anderes überwiegt.',
    ],
    thirsty: [
      'Der Wassernapf wird häufig angeflogen — {name} trinkt in schnellen, kurzen Schlucken.',
      '{name} sitzt auffallend oft in der Nähe des Wassernapfs.',
    ],
    exhausted: [
      '{name} schließt immer wieder kurz die Augen — Sekundenschlaf. Der Körper fordert Ruhe ein.',
      'Die Bewegungen sind langsam und bedächtig, als hätte {name} Blei in den Flügeln.',
    ],
    lonely: [
      'Zwischen den anderen Geräuschen: Kontaktrufe. Immer wieder. {name} ruft nach einem Schwarm, der nicht da ist.',
      '{name} wendet sich dem Menschen zu, wenn jemand im Raum ist — nicht aus Zuneigung, sondern aus Mangel an Alternative.',
      'Ein einzelner Wellensittich in einem Käfig. Die Stille zwischen den Rufen sagt mehr als die Rufe selbst.',
    ],
    tired: [
      '{name} hat die Augen halb geschlossen und den Kopf eingezogen. Schlafbedürfnis, das nicht gestillt wird.',
      'Immer wieder nickt {name} ein und schreckt hoch — zu müde zum Wachsein, zu unruhig zum Schlafen.',
    ],
    curious: [
      '{name} streckt den Hals und legt den Kopf schräg — etwas hat die Aufmerksamkeit geweckt. Die Pupillen pinnen.',
      'Ein neues Geräusch, und {name} bewegt sich näher. Vorsichtig, aber interessiert. Neugier gewinnt gegen Angst.',
    ],
    scared: [
      '{name} hat sich so dünn wie möglich gemacht — Federn angelegt, Körper gestreckt, bereit zur Flucht. Das Gegenteil von Aufplustern.',
      'Jedes Geräusch lässt {name} zusammenzucken. Die Augen sind weit offen, der ganze Körper auf Alarmstufe.',
    ],
    bored: [
      '{name} sitzt seit Stunden an derselben Stelle. Keine Exploration, keine Laute. Ein Vogel, der aufgegeben hat, etwas Interessantes zu finden.',
      'Immer dieselbe Route am Gitter entlang. Hin und zurück. Hin und zurück. Nichts anderes zu tun.',
    ],
    plucked: [
      'An Brust und Bauch sind kahle Stellen sichtbar — {name} hat sich Federn ausgerissen. Kein kosmetisches Problem, sondern ein Hilferuf.',
      'Das Gefieder ist lückenhaft, einzelne neue Federn stehen hervor wie Stoppeln. Die Rupfstellen erzählen eine Geschichte von Stress.',
    ],
    bonded: [
      '{name} dreht den Kopf zur Seite, wenn du sprichst, und lauscht. Die Pupillen reagieren auf deine Stimme — du bist erkannt.',
      'Ein leises, zärtliches Gezwitscher, wenn du näher kommst. {name} hat dich als Bezugsperson angenommen.',
    ],
    molting: [
      'Überall im Käfig liegen kleine Federn. {name} steckt mitten in der Mauser — kratzt sich häufig, ist gereizter als sonst.',
      'Neue Federkiele sind sichtbar, noch in der Hülle. {name} ist unruhig — Mauser juckt und kostet Energie.',
    ],
    paired: [
      '{name} und {companion} sitzen dicht beieinander, kraulen sich gegenseitig am Kopf. Paarbindung — der stärkste Stress-Puffer, den ein Wellensittich haben kann.',
      'Die beiden Vögel synchronisieren ihre Kontaktrufe. Was als zwei verschiedene Stimmen begann, nähert sich einander an — sie entwickeln einen gemeinsamen Ruf.',
    ],
  };


  // =========================================================================
  // INNERER MONOLOG (1. Person, Wellensittich-Perspektive)
  // =========================================================================

  const MONOLOGUE = {

    content: [
      'Die Stange fühlt sich richtig an unter meinen Füßen. Die Luft ist warm, das Licht stimmt. Ich kann jeden Farbton im Gefieder des anderen sehen — ultraviolette Muster, die kein Mensch wahrnimmt. Alles ist, wie es sein soll.',
      'Ich singe. Nicht weil ich muss, nicht weil jemand zuhört. Ich singe, weil die Welt gerade in Ordnung ist. Die Töne formen sich von selbst — Melodien, die ich irgendwo aufgeschnappt habe, neu zusammengesetzt.',
      'Das Korn zwischen meinen Schnabelhälften, das Knacken, der Geschmack. Dann das nächste. Fressen ohne Hast, ohne Angst, jemand könnte mir das Futter wegnehmen. So sollte es immer sein.',
      'Mein Gefieder glänzt. Feder für Feder ziehe ich durch den Schnabel — das Öl aus der Bürzeldrüse verteilt sich, macht alles geschmeidig. Putzen ist kein Zwang. Putzen ist Luxus. Nur wer sich sicher fühlt, putzt sich so.',
      'Die Welt riecht nach frischem Futter und warmem Holz. Ich hänge kopfüber am Spielzeug und lasse mich baumeln. Es gibt keinen Grund dafür. Braucht es keinen.',
      'Ich übe Töne. Leise, nur für mich. Etwas, das ich gehört habe — ich forme es nach, verändere es, mache es zu meinem. Die Laute perlen aus meinem Schnabel wie Wasser, und jeder klingt anders als der letzte.',
      'Meine Füße greifen, lösen, greifen wieder. Klettern um des Kletterns willen. Der Körper will sich bewegen, und heute hat er allen Grund dazu — alles funktioniert. Muskeln, Federn, Gleichgewicht. Alles richtig.',
    ],

    neutral: [
      'Die Umgebung ist vertraut. Keine Bedrohung, keine Überraschung. Ich kenne die Geräusche — das Brummen von der Wand, die Schritte, das Klicken. Nichts davon macht mir Angst. Nichts davon macht mir Freude.',
      'Ich sitze. Ich beobachte. Das große Wesen bewegt sich durch den Raum, macht seine Dinge. Ich mache meine. Wir koexistieren.',
      'Ein Korn hier, ein Schluck Wasser dort. Der Tag zieht vorbei wie alle Tage. Nicht schlecht. Nicht besonders. Einfach da.',
      'Von meiner Stange aus sehe ich das Fenster. Draußen bewegen sich Dinge, die ich nicht erreichen kann. Manchmal schaue ich hin. Manchmal nicht. Es macht keinen Unterschied.',
      'Ein Geräusch von draußen. Nicht bedrohlich, nicht interessant. Mein Kopf dreht sich hin, registriert, dreht sich zurück. Tausendmal am Tag. Das Gehirn filtert, was wichtig ist. Heute: nichts.',
      'Mein Schnabel formt lautlose Bewegungen — ich knirsche leise. Nicht aus Schmerz, nicht aus Stress. Es ist wie Kauen im Schlaf. Der Schnabel tut, was der Schnabel tut.',
    ],

    restless: [
      'Etwas stimmt nicht. Ich kann es nicht benennen — kein Raubtier, kein Geräusch, keine Kälte. Aber mein Körper sagt: Beweg dich. Flieg. Tu was. Und ich habe nicht genug Platz dafür.',
      'Ich springe von hier nach dort, aber es hilft nicht. Die Unruhe sitzt unter den Federn, irgendwo zwischen Brust und Bauch. Ich kratze mich. Es hilft kurz. Dann kommt es wieder.',
      'Wo sind die anderen? Ich rufe. Stille. Ich rufe wieder. Die Stille danach ist schlimmer als ein Warnruf.',
      'Die Stange ist falsch. Die andere auch. Und die nächste. Alles fühlt sich an wie ein Ort, an dem ich nicht bleiben kann. Aber es gibt nur diese Orte.',
      'Mein Schnabel sucht etwas zu tun. Knabbern. Nagen. Irgendwas festhalten. Wenn der Kopf nicht ruhig wird, müssen wenigstens die Zähne — der Schnabel — beschäftigt sein.',
    ],

    stressed: [
      'Alles ist zu viel. Die Geräusche sind zu laut, das Licht ist falsch, der Raum fühlt sich an wie eine Falle. Ich mache mich klein. Je kleiner, desto unsichtbarer. Unsichtbar = sicher.',
      'Ich rupfe. Die Feder zwischen meinem Schnabel, das kurze Ziehen, der Schmerz — und dann Erleichterung. Für einen Moment. Dann kommt das Nächste. Ich weiß, dass es falsch ist. Ich kann nicht aufhören.',
      'Meine Füße klammern sich an die Stange. Nicht loslassen. Nicht bewegen. Jede Veränderung könnte die letzte sein. Hier oben bin ich am weitesten weg von allem.',
      'Etwas in mir läuft auf Hochtouren. Nicht das Herz — das auch — sondern die Wachsamkeit. Alles ist Bedrohung. Der Schatten an der Wand. Das Klicken. Die Stille danach. Ich kann nicht aufhören zu scannen.',
      'Links, rechts, links, rechts. Dieselbe Strecke am Gitter. Wenn ich aufhöre, ist die Panik da. Wenn ich weitermache, ist die Panik leiser. Also weitermachen. Immer weitermachen.',
    ],

    crisis: [
      'Ich bin so müde. Die Stange unter meinen Füßen, das ist das Einzige, was ich noch spüre. Fressen? Wozu. Rufen? Niemand antwortet. Die Farben verblassen.',
      'Mein Körper gehorcht mir nicht mehr richtig. Die Flügel fühlen sich schwer an, der Schnabel auch. Ich sollte mich putzen, aber ich kann nicht. Ich sitze nur noch da.',
    ],

    sleeping: [
      'Dunkel. Warm. Die Geräusche werden leiser, rücken in die Ferne. Mein Kopf sinkt ins Gefieder. Sicher genug, um loszulassen. Im Schlaf höre ich Melodien, die ich morgen versuchen werde.',
      'Ein Bein eingezogen, Kopf im Rücken. Die Welt dreht sich weiter, aber für ein paar Stunden gehört sie mir nicht. Nur Stille und Wärme.',
    ],

    sick: [
      'Etwas in mir funktioniert nicht. Ich weiß nicht was — ich habe keine Worte dafür, nur ein Gefühl: Alles kostet mehr Kraft als gestern. Ich muss stark wirken. Wer schwach wirkt, wird gefressen.',
      'Der Futternapf ist da unten. Ich müsste fliegen. Aber Fliegen kostet Energie, die ich nicht habe. Also sitze ich. Und hoffe, dass es morgen besser wird.',
    ],

    dying: [
      'Kalt. Alles ist kalt, obwohl die Luft warm sein müsste. Ich kann die Stange nicht mehr richtig halten. Unten ist der Boden. Er kommt näher.',
    ],

    dead: [''],
  };


  // =========================================================================
  // MONOLOG-MODIFIKATOREN
  // =========================================================================

  const MONOLOGUE_MODS = {
    hungry: [
      'Mein Magen ist leer. Das Futter im Napf riecht nach wenig — oder ich rieche weniger. Ich sollte fressen, aber der Weg nach unten fühlt sich weit an.',
      'Hunger. Nicht akut, nicht schmerzhaft, aber da. Ein dumpfes Ziehen, das alles andere überlagert.',
    ],
    thirsty: [
      'Wasser. Ich brauche Wasser. Der Napf glänzt da unten.',
    ],
    exhausted: [
      'Meine Augenlider sind so schwer. Ich blinzle, und jedes Blinzeln dauert länger. Der Schlaf will mich, aber ich lasse ihn nicht.',
    ],
    lonely: [
      'Die Stille ist das Schlimmste. Nicht die Geräusche der Welt — das Brummen, die Schritte, die Stimmen. Sondern die Stille dort, wo ein Schwarm sein sollte. Ich rufe, und niemand ruft zurück. Nicht in meiner Sprache.',
      'Das große Wesen redet manchmal mit mir. Es ist ... nett. Aber es ist kein Wellensittich. Es versteht nicht, was Kontaktrufe bedeuten. Es antwortet nicht richtig.',
    ],
    tired: [
      'So müde. Jeder Laut, jede Bewegung fühlt sich an wie durch Wasser. Mein Körper will schlafen, aber es ist hell, und irgendwas in mir sagt: Noch nicht.',
    ],
    curious: [
      'Da! Was ist das? Neu. Fremd. Möglicherweise gefährlich. Aber auch möglicherweise interessant. Ich strecke den Hals, lege den Kopf schräg. Von diesem Winkel sieht es anders aus.',
    ],
    scared: [
      'Gefahr. Mein Herz rast — 600 Schläge pro Minute, vielleicht mehr. Die Muskeln sind gespannt, die Flügel angelegt. Fliehen oder erstarren. Beides gleichzeitig.',
    ],
    bored: [
      'Wieder derselbe Tag. Dieselben Stangen. Dieselbe Aussicht. Ich kenne jeden Millimeter dieses Käfigs. Es gibt nichts mehr zu entdecken.',
    ],
    plucked: [
      'Die kahle Stelle an meiner Brust fühlt sich seltsam an — kalt, wo es warm sein sollte. Ich weiß, dass ich es selbst gemacht habe. Ich weiß auch, dass ich es wieder tun werde.',
    ],
    bonded: [
      'Das große Wesen ist da. Ich kenne seine Stimme, seine Schritte, seinen Rhythmus. Es ist kein Schwarm. Aber es ist ... etwas. Etwas Vertrautes in einer fremden Welt.',
    ],
    molting: [
      'Alles juckt. Überall wachsen neue Federn unter der Haut, drücken durch die alten. Ich kratze mich, aber es hilft nicht. Die neuen Kiele sind empfindlich — jede Berührung sticht.',
    ],
    paired: [
      'Er ist da. Sein Ruf neben mir, sein Gefieder an meinem. Wir atmen im gleichen Rhythmus. Wenn ich rufe, antwortet er — sofort, in meiner Tonlage. Das ist Schwarm. Das ist, wie es sein sollte.',
    ],
  };


  // =========================================================================
  // WISSENSCHAFTLICHE ERKLÄRUNGEN
  // =========================================================================

  const EXPLANATIONS = {

    content: [
      'Dein Wellensittich zeigt alle Zeichen von Wohlbefinden: aktive Gefiederpflege, melodisches Singen, explorative Bewegungen. Der Kortikosteron-Spiegel (Stresshormon bei Vögeln) ist vermutlich niedrig, das parasympathische Nervensystem dominiert. Ein entspannter Wellensittich ist ein aktiver Wellensittich.',
      'Die Pupillen-Reaktion (Pinning) bei positiver Erregung ist ein gut dokumentiertes Verhalten bei Papageienartigen. Es zeigt hohe Aufmerksamkeit bei gleichzeitig niedriger Bedrohungsbewertung — der Vogel ist interessiert, nicht ängstlich.',
      'Das synchrone Strecken von Flügel und Bein auf einer Seite nennt man in der Ornithologie "unilateral stretching". Vögel machen das nur, wenn sie sich absolut sicher fühlen — beide Extremitäten einer Seite gleichzeitig zu bewegen, reduziert die Fluchtfähigkeit. Es ist ein Vertrauensbeweis an die Umgebung.',
      'Wellensittiche zeigen im Wohlbefinden eine bemerkenswerte Bandbreite an Vokalisationen: Kontaktrufe, Gesang, Nachahmen und "Brabbeln" (subsong). Das Brabbeln — leise, undeutliche Lautfolgen — ist das Äquivalent zum menschlichen Vor-sich-hin-Summen. Ein Verhalten, das nur bei niedrigem Stresslevel auftritt.',
    ],

    neutral: [
      'Normales Wachverhalten. Der Vogel ist aufmerksam, aber nicht aktiviert. Die Kontaktrufe in regelmäßigen Abständen sind Routine — ein Check, ob die akustische Umgebung noch stimmt. Wellensittiche nutzen Kontaktrufe, um individuelle Schwarmpartner zu identifizieren.',
      'Wellensittiche verbringen etwa 30 % ihres Wachtages mit Komfortverhalten: Putzen, Strecken, Kratzen. Das klingt nach viel, ist aber normal. Ein Vogel, der diese Routinen einhält, hat seine Grundbedürfnisse gedeckt — die mentale "Checkliste" ist nicht im Alarmmodus.',
      'Unihemisphärischer Schlaf: Wellensittiche können eine Gehirnhälfte ruhen lassen, während die andere wach bleibt. Das offene Auge überwacht die Umgebung. In freier Wildbahn schlafen Vögel am Schwarmrand häufiger unihemisphärisch — sie sind die Wachposten. In Einzelhaltung muss der Vogel sein eigener Wachposten sein. Immer.',
    ],

    restless: [
      'Die Unruhe hat wahrscheinlich mehrere Ursachen, die sich addieren. Wellensittiche zeigen selten EINE isolierte Stressreaktion — stattdessen summieren sich kleine Stressoren (Einzelhaltung, zu wenig Platz, fehlende Beschäftigung) zu einem diffusen Unwohlsein. Der Vogel versucht, durch Bewegung Stress abzubauen, findet aber keine Lösung.',
      'Das häufige Kratzen bei innerer Unruhe ist eine Übersprungshandlung — der Vogel kann die Ursache seiner Unruhe nicht direkt beeinflussen und leitet die Energie in eine andere Verhaltensweise um. Ähnlich wie ein Mensch, der sich am Kopf kratzt, wenn er nervös ist.',
      'Wellensittiche in freier Wildbahn legen täglich Dutzende Kilometer zurück. In Gefangenschaft — selbst im besten Käfig — ist dieser Bewegungsdrang niemals vollständig befriedigbar. Die Unruhe, die du siehst, ist aufgestaute kinetische Energie: Der Körper will fliegen, der Raum lässt es nicht zu.',
      'Gitterknabbern ist ein häufiges Ventil für aufgestaute Energie. Es ist KEINE Aufforderung zum Freilassen (das wäre Anthropomorphisierung), sondern ein stereotypes Verhalten, das Spannungsabbau signalisiert. Die Frage ist: Was erzeugt die Spannung? Einsamkeit, Platzmangel, Langeweile — oft alles zusammen.',
    ],

    stressed: [
      'Aufplustern bei Stress ist KEINE Kuschelreaktion. Die Federmuskeln (Musculi pennales) kontrahieren unter Kontrolle des sympathischen Nervensystems und richten die Federn auf. Bei Kälte isoliert das die Luftschicht am Körper. Bei Stress ist es ein vegetativer Reflex — der Vogel kann es nicht steuern. Es ist vergleichbar mit Gänsehaut beim Menschen.',
      'Stereotypien (repetitives Gitterklettern, Kopfnicken) sind ein wissenschaftlich gut dokumentiertes Symptom bei Vögeln in unzureichender Haltung. Die Handlung hat keine Funktion — sie ist ein Ventil für aufgestaute Energie in einer Umgebung, die keine sinnvolle Aktivität zulässt. In der Tiermedizin gilt Stereotypie als sicheres Zeichen für mangelhaftes Welfare.',
      'Chronisch erhöhtes Kortikosteron — das aviäre Stresshormon, funktional verwandt mit Cortisol bei Säugetieren — hat messbare Auswirkungen: Immunsuppression, veränderte Mauser, Federrupfen, reduzierte Reproduktionsfähigkeit. Der Körper opfert langfristiges Wohlbefinden für kurzfristiges Überleben. Das funktioniert in der Natur, wo Stressoren vorübergehen. In Gefangenschaft wird es zum Dauerzustand.',
      'Fluchtbereitschaft bei gleichzeitiger Starre: Der Vogel ist im Freeze-Modus — eine der drei Stressreaktionen (Fight, Flight, Freeze). Bei Wellensittichen in geschlossenen Räumen überwiegt Freeze, weil Flucht ins Offene nicht möglich ist. Der Vogel sieht ruhig aus, aber die inneren Stresswerte sind auf Maximum.',
    ],

    crisis: [
      'Bodenaufenthalt bei Wellensittichen ist ein ALARMZEICHEN. Gesunde Wellensittiche meiden den Boden — in freier Wildbahn bedeutet Boden = Raubtiere. Wenn ein Vogel freiwillig am Boden sitzt, ist er entweder zu schwach zum Fliegen oder zu apathisch, um sich zu schützen. Beides erfordert sofortige tierärztliche Abklärung.',
      'Wellensittiche sind Beutetiere. Evolutionär ist es ein Todesurteil, Schwäche zu zeigen — kranke Tiere werden aus dem Schwarm ausgestoßen oder von Raubtieren zuerst erbeutet. Deshalb verbergen Wellensittiche Krankheit bis zum letzten Moment. Wenn du Symptome SIEHST, ist der Vogel schon länger krank. Sofort zum vogelkundigen Tierarzt.',
    ],

    sleeping: [
      'Wellensittiche brauchen 10–12 Stunden ununterbrochene Dunkelheit für einen gesunden Schlafzyklus. Das Hormon Melatonin, das den Schlaf-Wach-Rhythmus steuert, wird lichtabhängig produziert. Dauerlicht (TV, Lampen) stört die Produktion und kann zu chronischem Schlafmangel führen — mit Auswirkungen auf Immunsystem, Mauser-Zyklus und Stressresilienz.',
      'Vögel zeigen im Schlaf Gehirnaktivität, die dem Rehearsal von Gesängen ähnelt. Sie "üben" im Schlaf neue Laute — ähnlich wie Menschen im Schlaf Gelerntes konsolidieren. Guter Schlaf ist direkt mit der Fähigkeit zum Vocal Learning verbunden.',
    ],

    sick: [
      'Die Kunst des Verbergens: Ein Wellensittich mit einer Infektion wird alles tun, um normal zu wirken. Er frisst weniger, aber er frisst noch. Er ist weniger aktiv, aber er bewegt sich noch. Die Abweichungen sind subtil — leicht reduzierte Fressmenge, etwas häufigeres Aufplustern, minimal veränderte Kotbeschaffenheit. Als Halter muss man diese LEISEN Signale erkennen.',
      'Wichtig: Nicht jedes Aufplustern bedeutet Krankheit (kann auch Wohlfühlen sein), und nicht jede Verhaltensänderung ist pathologisch. Aber KOMBINATIONEN sind aussagekräftig: Aufplustern + reduzierte Nahrungsaufnahme + weniger Aktivität = dringendes Warnsignal. Ein einzelnes Symptom ist ein Hinweis. Drei Symptome sind ein Notfall.',
    ],

    dying: [
      'Der Vogel zeigt terminale Anzeichen. Ohne sofortige intensivmedizinische Versorgung durch einen vogelkundigen Tierarzt ist die Prognose sehr schlecht. Wellensittiche haben einen extrem schnellen Stoffwechsel — wenn die Energiereserven aufgebraucht sind, geht es innerhalb von Stunden bergab.',
    ],
  };


  // =========================================================================
  // ERKLÄRUNG-MODIFIKATOREN
  // =========================================================================

  const EXPLANATION_MODS = {
    hungry: [
      'Wellensittiche fressen über den Tag verteilt kleine Mengen — im Gegensatz zu Säugetieren keine festen Mahlzeiten. Ihr schneller Stoffwechsel bedeutet: Schon 24 Stunden ohne Nahrung können kritisch werden. Bei kranken oder gestressten Vögeln sinkt der Appetit zusätzlich — ein Teufelskreis.',
    ],
    lonely: [
      'EINZELHALTUNG: Wellensittiche sind obligat soziale Tiere. In freier Wildbahn leben sie in Schwärmen von hunderten bis tausenden Vögeln. Einzelhaltung ist vergleichbar mit menschlicher Isolationshaft — chronischer Stress, der nicht kompensierbar ist. Ein Mensch kann einen Artgenossen NICHT ersetzen. Ein zweiter Wellensittich reduziert den Stresspegel messbar und dramatisch.',
    ],
    scared: [
      'Die Angstreaktion bei Wellensittichen ist extrem schnell — das vegetative Nervensystem reagiert in Millisekunden. Herzfrequenz über 600/min, Fluchtmuskeln aktiviert, Wahrnehmung auf Bewegungserkennung geschärft. In einem geschlossenen Raum kann Panik zu Verletzungen führen (Anflug gegen Fenster, Wände, Spiegel).',
    ],
    plucked: [
      'Federrupfen (Pterotillomanie) ist bei Papageienartigen eine der häufigsten Verhaltensstörungen. Ursachen: Stress, Langeweile, Einzelhaltung, Mangelernährung, Hormonprobleme — meist eine Kombination. Wichtig: Federrupfen ist kein "Tick", den man dem Vogel abgewöhnen kann. Es ist ein Symptom, dessen URSACHE behandelt werden muss.',
    ],
    molting: [
      'Die Mauser wird durch den Hormonhaushalt gesteuert (Thyroidhormone, Prolaktin) und ist ein enormer physiologischer Aufwand. Der Vogel produziert hunderte neue Federn gleichzeitig — das kostet Protein, Kalzium, Energie. Schlechte Ernährung während der Mauser = schlechtes Gefieder für die nächsten Monate. Eifutter, Mineralstein und Frischkost sind jetzt besonders wichtig.',
    ],
    bonded: [
      'Die Bindung zwischen Wellensittich und Mensch basiert auf Gewöhnung und positiver Assoziation, nicht auf Zuneigung im menschlichen Sinne. Der Vogel lernt: Dieses Wesen = Futter, Sicherheit, Stimulation. Das ist keine geringere Form von Bindung — es ist eine ehrlichere. Der Vogel braucht dich, weil du verlässlich bist, nicht weil du nett bist.',
    ],
    paired: [
      'Paarbindung bei Wellensittichen: Echte Paare synchronisieren nicht nur ihre Rufe, sondern auch Fress- und Schlafzeiten. Der Kortikosteron-Spiegel (Stresshormon) sinkt messbar in Gegenwart eines gebundenen Partners. Kein Spielzeug, kein Mensch, keine Musik hat denselben Effekt.',
    ],
  };


  // =========================================================================
  // TAGESZEIT-DETAILS
  // =========================================================================

  const TIME_DETAILS = {
    dawn: [
      'Das erste Licht fällt in den Raum. Die Luft riecht nach Morgen — kühler, frischer als tagsüber.',
      'Die Morgendämmerung bringt die ersten Laute — leise Kontaktrufe, die checken: Ist der Schwarm noch da?',
      'Draußen wird es hell. Der Vogelkörper reagiert auf Licht schneller als jeder Wecker — Melatonin fällt, Kortisol steigt, die Maschine läuft an.',
    ],
    morning: [
      'Vormittag — die aktivste Phase eines Wellensittichs. Der Körper ist auf Maximum, die Sinne geschärft.',
      'Morgenenergie. In der australischen Steppe wäre jetzt Futtersuche — über weite Flächen, im Schwarm.',
      'Die Morgenstunden gehören dem Fressen, dem Singen und der Erkundung. Alles gleichzeitig, wenn es gut läuft.',
    ],
    midday: [
      'Mittagsruhe. Auch in der Wildnis ruhen Wellensittiche in den heißen Mittagsstunden.',
      'Die Mittagssonne fällt schräg ein. Ruhezeit — weniger Aktivität, mehr Dösen.',
      'In Australien wäre jetzt die Hitze des Tages. Der Instinkt sagt: Ruhen. Energie sparen. Warten.',
    ],
    afternoon: [
      'Nachmittag — die zweite Aktivphase. Soziale Interaktion, Futtersuche, Erkundung.',
      'Am Nachmittag steigt die Sozialaktivität — Kontaktrufe, Kraulen, gemeinsames Fressen.',
      'Die Nachmittagssonne fällt flacher. Noch ein paar aktive Stunden, bevor der Tag zur Neige geht.',
    ],
    evening: [
      'Abend. Die Lichtintensität sinkt, und mit ihr die Aktivität. Zeit für die ausgiebige Abendtoilette — Feder für Feder durch den Schnabel.',
      'Das Licht wird wärmer, weicher. {name} beginnt sich für die Nacht einzurichten. Letzte Runde Gefiederpflege.',
      'Die Schatten werden länger. In der Natur wäre der Schwarm jetzt am Schlafbaum — dicht beieinander, Seite an Seite.',
    ],
    night: [
      'Nacht. Dunkelheit bedeutet Sicherheit — kein Raubtier kann sehen, also muss auch der Wellensittich nicht wachsam sein. Schlafzeit.',
      'Stille. Die Nacht gehört dem Schlaf und der Hormonproduktion. Melatonin, Wachstumshormon, Immunfunktion — alles passiert jetzt.',
      'Die Welt ist still. Im Dunkeln konsolidiert das Vogelgehirn die Gesänge des Tages — Melodien, die morgen anders klingen werden als heute.',
    ],
  };


  // =========================================================================
  // SINNES-DETAILS (für Monologe)
  // =========================================================================

  const SENSE_DETAILS = {
    vision_uv: [
      'Die Farben sind intensiver als das, was Menschen sehen. Das Ultraviolette: Ein vierter Farbkanal, der Muster im Gefieder sichtbar macht, die im menschlichen Spektrum nicht existieren.',
      'Ich sehe Dinge in den Federn der anderen, die kein Mensch sieht. UV-reflektierende Muster — so erkenne ich, wer gesund ist und wer nicht.',
    ],
    vision_no_uv: [
      'Alles sieht ... flach aus. Wie ein Foto statt der echten Welt. Die Farben der anderen Vögel stimmen nicht — als würde etwas fehlen, das ich nicht benennen kann.',
      'Irgendetwas am Licht ist falsch. Die Welt hat weniger Dimensionen als sie sollte. Ich sehe, aber ich sehe nicht ALLES.',
    ],
    hearing: [
      'Ich höre Frequenzen, die dem großen Wesen entgehen. Das Summen der Leitungen in der Wand. Das Ticken von irgendwas Metallischem. Und draußen — Vögel, deren Rufe ich nicht kenne.',
      'Meine Ohren trennen Geräusche schneller als jedes Säugetierohr. Was für Menschen ein einzelner Ton ist, ist für mich eine Abfolge von Einzellauten.',
    ],
    air_pressure: [
      'Die Luft hat sich verändert. Schwerer. Dichter. Etwas kommt — Wetter, wahrscheinlich. Mein Körper weiß es, bevor der Himmel es zeigt.',
    ],
    temperature: [
      'Die Luft auf meiner Haut, unter den Federn. Jede Temperaturänderung ist ein Signal — aufplustern oder anlegen, je nachdem.',
    ],
  };


  // =========================================================================
  // INTRO-TEXTE (für den Spielstart)
  // =========================================================================

  const INTRO = {
    title: 'Du hast einen Wellensittich aufgenommen.',
    text: `Er sitzt in der hintersten Ecke seines neuen Käfigs, aufgeplustert, die Augen aufmerksam. Alles ist fremd — neue Gerüche, neue Geräusche, kein Schwarm in Hörweite.

Was du in den nächsten Tagen tust, entscheidet darüber, ob er sich einlebt oder ob es bergab geht.

Wellensittiche verbergen Krankheit und Stress, bis es fast zu spät ist. Lerne, die leisen Signale zu lesen.`,
  };


  // =========================================================================
  // TODES-TEXTE
  // =========================================================================

  const DEATH_TEXTS = {
    starvation: {
      epitaph: '{name} ist verhungert.',
      lesson: 'Wellensittiche haben einen extrem schnellen Stoffwechsel. Schon 24–48 Stunden ohne ausreichend Nahrung können tödlich sein. Fressen ist lebenswichtig — und gestresste oder kranke Vögel fressen weniger, was den Teufelskreis beschleunigt.',
    },
    dehydration: {
      epitaph: '{name} ist verdurstet.',
      lesson: 'Frisches Wasser muss IMMER verfügbar sein. Kein Kompromiss. Wellensittiche trinken kleine Mengen über den Tag verteilt — ist das Wasser verschmutzt oder leer, dehydrieren sie schnell.',
    },
    hypothermia: {
      epitaph: '{name} ist an Unterkühlung gestorben.',
      lesson: 'Wellensittiche kommen aus der australischen Steppe. Temperaturen unter 10 °C sind gefährlich, unter 5 °C tödlich. Zugluft verschlimmert das Problem — auch bei Zimmertemperatur.',
    },
    heatstroke: {
      epitaph: '{name} ist an einem Hitzschlag gestorben.',
      lesson: 'Wellensittiche können nicht schwitzen. Bei Temperaturen über 35 °C und ohne Möglichkeit, sich in den Schatten zurückzuziehen, überhitzt der Körper schnell. Direkte Sonneneinstrahlung auf den Käfig ist lebensgefährlich.',
    },
    toxic_fumes: {
      epitaph: '{name} wurde durch Teflon-Dämpfe vergiftet.',
      lesson: 'Polytetrafluorethylen (PTFE/Teflon) setzt beim Erhitzen Dämpfe frei, die für Vögel innerhalb von Minuten tödlich sind. Beschichtete Pfannen, Backöfen, Raclette-Grills, Heizlüfter mit Teflon-Beschichtung — all das hat in einem Raum mit Vögeln NICHTS zu suchen. Die Küche ist der gefährlichste Ort für einen Wellensittich.',
    },
    illness: {
      epitaph: '{name} ist an einer Krankheit gestorben.',
      lesson: 'Wellensittiche verbergen Krankheit bis zum letzten Moment — Beutetier-Instinkt. Wenn du Symptome SIEHST (Aufplustern, Futterverweigerung, veränderten Kot, Apathie), ist der Vogel schon lange krank. Frühzeitig zum vogelkundigen (!) Tierarzt gehen. Nicht jeder Tierarzt kennt sich mit Vögeln aus.',
    },
    stress_death: {
      epitaph: '{name} ist an den Folgen von chronischem Stress gestorben.',
      lesson: 'Chronischer Stress tötet — nicht dramatisch, sondern schleichend. Erhöhtes Kortikosteron schwächt das Immunsystem, verändert den Stoffwechsel, schädigt Organe. Die häufigsten Ursachen: Einzelhaltung, zu kleiner Käfig, fehlende Beschäftigung, Lärm, falsche Lichtverhältnisse. Alles vermeidbar.',
    },
    loneliness: {
      epitaph: '{name} ist an Einsamkeit gestorben.',
      lesson: 'Wellensittiche sind Schwarmtiere. Einzelhaltung ist keine artgerechte Haltung — es ist Isolation. Ein Mensch kann keinen Artgenossen ersetzen. Zwei Wellensittiche kosten kaum mehr als einer, brauchen denselben Käfig und dasselbe Futter — aber der Unterschied in der Lebensqualität ist enorm.',
    },
    injury: {
      epitaph: '{name} hat sich bei einem Panikflug tödlich verletzt.',
      lesson: 'Panikflüge (Night Frights) sind besonders bei einzeln gehaltenen Vögeln in unsicherer Umgebung häufig. Ein Schatten, ein Geräusch, eine Katze vor dem Fenster — und der Vogel fliegt in blinder Panik gegen Wände, Fenster oder Spiegel. Vermeidung: sichere Umgebung, Nachtlicht, Abdeckung, Stresslevel senken.',
    },
  };


  // =========================================================================
  // TEXT-GENERIERUNG
  // =========================================================================

  /**
   * Ersetzt Platzhalter im Text.
   */
  function _fillTemplate(text, brain) {
    return text
      .replace(/\{name\}/g, brain.name)
      .replace(/\{companion\}/g, brain.environment.companionName || 'der Partner');
  }

  /**
   * Bestimmt den Tageszeit-Key.
   */
  function _getTimeKey(hour) {
    if (hour >= 5 && hour < 8) return 'dawn';
    if (hour >= 8 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 14) return 'midday';
    if (hour >= 14 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 21) return 'evening';
    return 'night';
  }


  /**
   * Generiert eine komplette Beobachtung (Verhalten + Monolog + Erklärung).
   * @param {BudgieBrain} brain - Das Wellensittich-Gehirn
   * @returns {Object} { behavior, monologue, explanation, timeDetail }
   */
  function generateObservation(brain) {
    const mood = brain.getDominantMood();
    const mods = brain.getActiveModifiers();
    const timeKey = _getTimeKey(brain.hour);

    // --- VERHALTEN ---
    let behavior = PICK(BEHAVIOR[mood] || BEHAVIOR.neutral);
    behavior = _fillTemplate(behavior, brain);

    // Modifikatoren hinzufügen (max 2, um Textlänge zu kontrollieren)
    const activeMods = mods.slice(0, 2);
    const behaviorMods = activeMods
      .filter(m => BEHAVIOR_MODS[m])
      .map(m => _fillTemplate(PICK(BEHAVIOR_MODS[m]), brain));
    if (behaviorMods.length > 0) {
      behavior += ' ' + behaviorMods.join(' ');
    }

    // --- MONOLOG ---
    let monologue = PICK(MONOLOGUE[mood] || MONOLOGUE.neutral);
    monologue = _fillTemplate(monologue, brain);

    const monologueMods = activeMods
      .filter(m => MONOLOGUE_MODS[m])
      .map(m => _fillTemplate(PICK(MONOLOGUE_MODS[m]), brain));
    if (monologueMods.length > 0) {
      monologue += ' ' + monologueMods.join(' ');
    }

    // Sinnesdetail hinzufügen
    let senseKey = brain.environment.hasUVLight ? 'vision_uv' : 'vision_no_uv';
    if (mood === 'scared') senseKey = 'hearing';
    if (brain.states.temperatureComfort < 40) senseKey = 'temperature';
    if (SENSE_DETAILS[senseKey]) {
      monologue += ' ' + PICK(SENSE_DETAILS[senseKey]);
    }

    // --- ERKLÄRUNG ---
    let explanation = PICK(EXPLANATIONS[mood] || EXPLANATIONS.neutral);
    explanation = _fillTemplate(explanation, brain);

    const explanationMods = activeMods
      .filter(m => EXPLANATION_MODS[m])
      .map(m => _fillTemplate(PICK(EXPLANATION_MODS[m]), brain));
    if (explanationMods.length > 0) {
      explanation += '\n\n' + explanationMods.join('\n\n');
    }

    // --- TAGESZEIT-DETAIL ---
    let timeDetail = '';
    if (TIME_DETAILS[timeKey]) {
      timeDetail = _fillTemplate(PICK(TIME_DETAILS[timeKey]), brain);
    }

    return {
      behavior,
      monologue,
      explanation,
      timeDetail,
    };
  }


  /**
   * Generiert den Todes-Text.
   */
  function generateDeathText(brain) {
    const cause = brain.stats.causeOfDeath;
    const deathInfo = DEATH_TEXTS[cause] || DEATH_TEXTS.illness;

    return {
      epitaph: _fillTemplate(deathInfo.epitaph, brain),
      lesson: deathInfo.lesson,
      stats: {
        daysSurvived: brain.stats.daysSurvived,
        totalInteractions: brain.stats.totalInteractions,
        fedCount: brain.stats.fedCount,
        vetVisits: brain.stats.vetVisits,
        worstStress: Math.round(brain.stats.worstStress),
      },
    };
  }


  /**
   * Gibt den Intro-Text zurück.
   */
  function getIntro() {
    return INTRO;
  }


  // =========================================================================
  // PUBLIC API
  // =========================================================================

  return {
    generateObservation,
    generateDeathText,
    getIntro,
    BEHAVIOR,
    MONOLOGUE,
    EXPLANATIONS,
    DEATH_TEXTS,
  };

})();
