const { nanoid } = require('nanoid');
const path = require('path');
const books = require(path.resolve(__dirname, 'books.js'));
// add
const addbook = (request,h)=>{
    const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

    if (name == undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const finished = (pageCount === readPage);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const book = {id,name,year,author,summary,publisher,pageCount,readPage,reading,finished,insertedAt,updatedAt};
    books.push(book);

    success = books.filter((n)=>{return n.id === id;}).length > 0;

    if (success){
        const response = h.response({
            
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'gagal menambahkan buku',
    });
    response.code(500);
    return response;
    
}

//get

const getReadingBook = (param)=>{
    if (param == 1){
        return books.filter((n)=>{return n.reading === true});
    }
    return books.filter((n)=>{return n.reading === false});
}
const getFinishedBook = (param)=>{ 
    if (param == 1){
        return books.filter((n)=>{return n.finished === true});
    }
    return books.filter((n)=>{return n.finished === false});
}
const getAllBook = (request,h)=>{
    const param = request.query;
    let data = [];
    let book = [];

    if (param.reading != undefined){
        data = getReadingBook(param.reading);
    }
    else if (param.finished != undefined){
        data = getFinishedBook(param.finished);
    }
    else if (param.name != undefined){
        let name = param.name.toLowerCase();
        data = books.filter((n)=>{
            return n.name.toLowerCase().indexOf(name) !== -1 ;
        });
    }
    else {data = books}
    

    for (let i=0; i<data.length; i++){
        book.push({
            id: data[i].id,
            name: data[i].name,
            publisher: data[i].publisher
        });
    }
    const response = h.response({
        status:'success',
        data: {books: book}
    });
    response.code(200);
    return response;
}

const getBookById = (request,h)=>{
    const {id} = request.params;
    const book = books.filter((n)=>{return n.id === id})[0];
    
    if (book != undefined){
        const response = h.response({
            status: 'success',
            data: {book}
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message:'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
}
//edit
const editBooks = (request,h)=>{
    const {id} = request.params;
    const data = request.payload;
    if (data.name == undefined){
        const response = h.response({
            status: 'fail',
            message:'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }
    if (data.readPage > data.pageCount){
        const response = h.response({
            status: 'fail',
            message:'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    const index = books.findIndex((e)=>{return e.id === id;});
    if (index != -1){
        books[index]={
            ...books[index],
            name: data.name,
            year: data.year,
            author: data.author,
            summary: data.summary,
            publisher: data.publisher,
            pageCount: data.pageCount,
            readPage: data.readPage,
            reading: data.reading
        }

        const response = h.response({
            status: 'success',
            message:'Buku berhasil diperbarui'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message:'Gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(404);
    return response;
}

//delete
const deleteBooks = (request,h)=>{
    const {id} = request.params;

    const index = books.findIndex((e)=>{return e.id === id;});
    if (index != -1){
        books.splice(index,1);
        const response = h.response({
            status: 'success',
            message:'Buku berhasil dihapus'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message:'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;
}
module.exports = { addbook, getBookById, editBooks, deleteBooks, getAllBook}