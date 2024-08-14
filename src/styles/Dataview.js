export const dataview = {
    textStyle: {
        flex: 1,
        color: '#000',
        // fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    container: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 10,
        gap: "1rem"
    },
    text: {
        fontWeight: "bold",
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    card: {
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: '#cbd5e1',
        borderRadius: 8,
        padding: 10,
        flex: 1,
        width: "18rem"
    },
    cardContainer: {
        display: "flex",
        padding:5
    },
    stickyInput: {
        position: "sticky",
        top: "20px",
        zIndex: 100,
        opacity: 1,
    },
    heightAndOverflow: {
        height: "auto",
        padding:10,
    },
    DataviewHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 2
    },
    back: {
        padding: 0
    },
    DetailView: {
        display: "flex",
        backgroundColor: '#cbd5e1',
        borderRadius: 8,
        flex: 1,
        flexDirection: "column",
        height: 'auto',
        width: '100%',
        maxWidth: '100%',
        overflow: 'auto',
        padding: '5px',
        gap: 0
    },
    img: {
        display:'flex',
        width: 200,
        height: 200,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      fileContainer:{
        display:"flex",
        flexDirection:'column',
        gap:0,
        marginBottom:5,
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 5,
        padding:5
      }

};