package md.delivery.reports;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import md.delivery.entity.Command;
import md.delivery.repository.CommandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Optional;

@Service
public class GeneratePdfReportService {

    @Autowired
    private CommandRepository commandRepository;

    public ByteArrayInputStream commandReport(Long commandId) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);

        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(80);
        table.setWidths(new int[]{3, 3, 3, 3});

        Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

        PdfPCell hcell;
        hcell = new PdfPCell(new Phrase("Product", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);

        hcell = new PdfPCell(new Phrase("Price (lei)", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);

        hcell = new PdfPCell(new Phrase("Quantity", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);

        hcell = new PdfPCell(new Phrase("Total (lei)", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);

        Optional<Command> commandById = commandRepository.findById(commandId);

        commandById.get().getCommandProducts().stream()
                .forEach(commandProduct -> {
                    PdfPCell cell;
                    cell = new PdfPCell(new Phrase(String.format("%s", commandProduct.getProduct().getName())));
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                    table.addCell(cell);

                    cell = new PdfPCell(new Phrase(commandProduct.getProduct().getPrice().toString()));
                    cell.setPaddingLeft(5);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                    table.addCell(cell);

                    cell = new PdfPCell(new Phrase(String.valueOf(commandProduct.getQuantity())));
                    cell.setPaddingLeft(5);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                    table.addCell(cell);

                    cell = new PdfPCell(new Phrase(String.valueOf(commandProduct.getQuantity() * commandProduct.getProduct().getPrice())));
                    cell.setPaddingLeft(5);
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                    table.addCell(cell);
                });

        PdfWriter.getInstance(document, out);
        document.open();
        document.add(new Phrase(String.format("Deliver: %s", commandById.get().getDeliver().getFirstName() + commandById.get().getDeliver().getLastName())));
        document.add(Chunk.NEWLINE);
        document.add(new Phrase(String.format("Market: %s", commandById.get().getMarket().getName())));
        document.add(Chunk.NEWLINE);
        document.add(new Phrase(String.format("Destination, country: %s, city: %s, street: %s", commandById.get().getMarket().getStreet().getCity().getCountry().getName(), commandById.get().getMarket().getStreet().getCity().getName(), commandById.get().getMarket().getStreet().getName())));
        document.add(Chunk.NEWLINE);
        document.add(new Phrase(String.format("Total Price: %s", commandById.get().getTotalPrice())));

        document.add(Chunk.NEWLINE);
        document.add(table);
        document.add(Chunk.NEWLINE);
        document.add(new Phrase(String.format("Deliver (%s %s):________________________", commandById.get().getDeliver().getFirstName(), commandById.get().getDeliver().getLastName())));
        document.add(Chunk.NEWLINE);
        document.add(new Phrase(String.format("Owner (%s %s):________________________", commandById.get().getMarket().getOwner().getFirstName(), commandById.get().getMarket().getOwner().getLastName())));
        document.add(Chunk.NEWLINE);
        document.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}
