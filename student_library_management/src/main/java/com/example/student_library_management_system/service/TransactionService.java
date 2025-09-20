package com.example.student_library_management_system.service;

import com.example.student_library_management_system.converters.TransactionConverter;
import com.example.student_library_management_system.model.Book;
import com.example.student_library_management_system.model.Card;
import com.example.student_library_management_system.model.Transaction;
import com.example.student_library_management_system.repository.BookRepository;
import com.example.student_library_management_system.repository.CardRepository;
import com.example.student_library_management_system.repository.TransactionRepository;
import com.example.student_library_management_system.requestdto.TransactionRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    @Autowired //to save and fetch transactions from DB.
    private TransactionRepository transactionRepository;

    @Autowired //fetch the student’s Card details.
    private CardRepository cardRepository;

    @Autowired //to fetch the Book involved in the transaction.
    private BookRepository bookRepository;

    public ResponseEntity<String> addTransaction(TransactionRequestDto transactionRequestDto){
        Transaction transaction = TransactionConverter.convertTransactionRequestDtoIntoTransaction(transactionRequestDto);

        Card card = cardRepository.findById(transactionRequestDto.getCardId()).get();
        transaction.setCard(card);

        Book book = bookRepository.findById(transactionRequestDto.getBookId()).get();
        transaction.setBook(book);//Fetches the book from DB using bookId.
        // Associates the book with this transaction.

        transactionRepository.save(transaction);
        return ResponseEntity.status(HttpStatus.OK).body("Transaction added successfully");
    }
}
