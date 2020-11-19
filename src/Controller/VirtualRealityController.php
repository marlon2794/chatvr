<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VirtualRealityController extends AbstractController
{
    /**
     * @Route("/virtual-reality", name="virtual_reality")
     */
    public function virtualReality(): Response
    {
        return $this->render('virtual_reality/index.html.twig');
    }

    /**
     * @Route("/avatar", name="avatar")
     */
    public function avatar(): Response
    {
        return $this->render('virtual_reality/avatar.html.twig');
    }

    /**
     * @Route("/chatvr", name="chatvr")
     */
    public function chatVr(): Response
    {
        return $this->render('virtual_reality/chat-vr.html.twig');
    }
}
