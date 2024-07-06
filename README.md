# DynamicSelectBox

https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_filter

TODO
- aggiorna il codice ottenendo 500 record dal server e gestendo la visualizzazione di es 10 alla volta (scorrendoli) dal client


idea alla get popolo tutta la lista, poi mostro ogni volta un numero di record pari alla n = dimensione UL/altezza_li
Gestione dello scroll: Aggiungiamo un event listener per l'evento scroll sul <ul> virtual-list. Quando lo scroll avviene, calcoliamo l'indice dell'elemento visibile in cima alla lista (startIndex), e in base a questo calcoliamo gli indici start e end degli elementi da visualizzare.
