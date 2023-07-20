package com.coursemanagement.spring.login.utils;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public class FileUploadUtil {
    public static void saveFile(String uploadDir, String fileName,
                                MultipartFile multipartFile) throws IOException {
        File uploadDirFile = new File(uploadDir);

        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }

        FileCopyUtils.copy(multipartFile.getBytes(), new File(uploadDir + "/" + fileName));
    }
}
