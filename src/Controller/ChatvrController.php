<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ChatvrController extends AbstractController
{
    /**
     * @Route("/chatvr", name="chatvr")
     */
    public function index(): Response
    {
        return $this->render('chatvr/index.html.twig');
    }
}
