Components Roadmap

For inspiration look at:
    https://staking.synthetix.io/
    https://stats.synthetix.io/

L0 components:
    Header:
        - Has to be presented at all times in L1 components
        - Includes: menu icon, network choice dropdown, shortened wallet address
    Menu:
        - Includes: links to all major components
        - Opens up after clicking on a burger icon

L1 components:
    Token List:
        - Displays tokens in a column oriented list, contains TokenTile
        - TokenTile includes: quantity?, price in USD, price change over 24 hrs, button that adds the token to the watchlist. On click takes you to the Token Screen.
    Wallet Display:
        - Includes: the balance of ETH (both quantity and USD value), expanded wallet address that you can click and copy and ERC-20 Token List
        - Set of functional buttons:  and swap token.
    Watchlist:
        - Container for a TokenList that gets data from a Redux store that has been saved to the device memory.
    Search:
        - Container for a debounced text input and a TokenList.
        - Fetches data from UniSwap based on an inputted ticker.
        - *Sorting dropdown with a following options: Alphabetical up or down, Price up or down, Price Change up or down. Could be reused with other TokenList instances.

L2 components:
    For every L2 component: menu burger icon turns into "go back button".
    Token Display:
        - Includes:
            Token name,
            symbol,
            stats: price and its change, volume and its change, total supply and its change (have to build a StatTile component),
            price chart: simplified Trading View iframe, we either provide data ourselves or use Dextools.io,
            trade button
    Swap window:
        - Includes: Name and quantity of _from currency, name and quantity of _to currency, updates rates automatically
        - *User can set slippage tolerance
        - Swap button
    Bridge ETH component:
        -Dropdown _from network, span _to network (Mainnet -> Arbitrum Mainnet, Rinkeby -> Arbitrum Rinkeby)
        -Balance of the wallet on the selected network
        -Numerical input of how much ETH does user want to swap
        -Reject or confirm buttons

Modal Windows:
    -Transaction modal window:
        Name and quantity of _from currency, name and quantity of _to currency
        Two inputs: gas price and gas limit, set them automatically but user can modify them
        *display 4 gas prices from gasnow.org
        Reject or confirm buttons
